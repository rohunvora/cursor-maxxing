// === Export Wizard JavaScript ===

// State
let currentStep = 1;
let parsedConversation = [];
let selectedMessages = new Set();
let redactions = new Map(); // messageIndex -> array of redacted ranges

// DOM Elements
const uploadZone = document.getElementById('uploadZone');
const fileInput = document.getElementById('fileInput');
const pasteArea = document.getElementById('pasteArea');
const continueBtn = document.getElementById('continueBtn');

// === Step Navigation ===
function nextStep() {
  if (currentStep < 5) {
    setStep(currentStep + 1);
  }
}

function prevStep() {
  if (currentStep > 1) {
    setStep(currentStep - 1);
  }
}

function setStep(step) {
  // Update progress bar
  document.querySelectorAll('.progress-step').forEach((el, i) => {
    el.classList.remove('active', 'completed');
    if (i + 1 < step) el.classList.add('completed');
    if (i + 1 === step) el.classList.add('active');
  });

  // Update visible step
  document.querySelectorAll('.wizard-step').forEach(el => {
    el.classList.remove('active');
    if (parseInt(el.dataset.step) === step) {
      el.classList.add('active');
    }
  });

  currentStep = step;

  // Step-specific setup
  if (step === 3) {
    renderMessagesList();
  } else if (step === 4) {
    renderReviewPreview();
  } else if (step === 5) {
    updateExportSummary();
  }
}

// === File Upload ===
uploadZone.addEventListener('click', () => fileInput.click());

uploadZone.addEventListener('dragover', (e) => {
  e.preventDefault();
  uploadZone.classList.add('drag-over');
});

uploadZone.addEventListener('dragleave', () => {
  uploadZone.classList.remove('drag-over');
});

uploadZone.addEventListener('drop', (e) => {
  e.preventDefault();
  uploadZone.classList.remove('drag-over');
  const files = e.dataTransfer.files;
  if (files.length > 0) {
    handleFile(files[0]);
  }
});

fileInput.addEventListener('change', (e) => {
  if (e.target.files.length > 0) {
    handleFile(e.target.files[0]);
  }
});

async function handleFile(file) {
  const status = document.getElementById('uploadStatus');
  
  try {
    const text = await file.text();
    let conversation;
    
    // Try to parse as JSON first
    try {
      const json = JSON.parse(text);
      conversation = parseJSON(json);
    } catch {
      // If not JSON, try to parse as plain text
      conversation = parsePlainText(text);
    }
    
    if (conversation && conversation.length > 0) {
      parsedConversation = conversation;
      status.textContent = `✓ Loaded ${conversation.length} messages`;
      status.className = 'upload-status success';
      continueBtn.disabled = false;
    } else {
      throw new Error('No messages found');
    }
  } catch (err) {
    status.textContent = `✗ Error: ${err.message}`;
    status.className = 'upload-status error';
    continueBtn.disabled = true;
  }
}

// === Paste Area ===
pasteArea.addEventListener('input', () => {
  const text = pasteArea.value.trim();
  if (text.length > 50) {
    const conversation = parsePlainText(text);
    if (conversation.length > 0) {
      parsedConversation = conversation;
      continueBtn.disabled = false;
      
      const status = document.getElementById('uploadStatus');
      status.textContent = `✓ Parsed ${conversation.length} messages from paste`;
      status.className = 'upload-status success';
    }
  } else {
    continueBtn.disabled = true;
  }
});

// === Parsing Functions ===
function parseJSON(json) {
  const messages = [];
  
  // Handle different JSON formats
  if (Array.isArray(json)) {
    // Array of messages
    json.forEach(msg => {
      if (msg.role && msg.content) {
        messages.push({
          role: msg.role.toLowerCase(),
          content: typeof msg.content === 'string' ? msg.content : JSON.stringify(msg.content)
        });
      }
    });
  } else if (json.messages) {
    // OpenAI-style format
    return parseJSON(json.messages);
  } else if (json.conversation) {
    // Cursor-style format
    return parseJSON(json.conversation);
  }
  
  return messages;
}

function parsePlainText(text) {
  const messages = [];
  const lines = text.split('\n');
  let currentRole = null;
  let currentContent = [];
  
  // Common patterns for user messages
  const userPatterns = [
    /^USER:\s*/i,
    /^Human:\s*/i,
    /^You:\s*/i,
    /^Q:\s*/i,
    /^>>\s*/,
    /^\[User\]\s*/i,
    /^Me:\s*/i
  ];
  
  // Common patterns for assistant messages
  const assistantPatterns = [
    /^ASSISTANT:\s*/i,
    /^AI:\s*/i,
    /^A:\s*/i,
    /^Claude:\s*/i,
    /^GPT:\s*/i,
    /^Response:\s*/i,
    /^\[Assistant\]\s*/i,
    /^Bot:\s*/i
  ];
  
  function saveCurrentMessage() {
    if (currentRole && currentContent.length > 0) {
      messages.push({
        role: currentRole,
        content: currentContent.join('\n').trim()
      });
      currentContent = [];
    }
  }
  
  lines.forEach(line => {
    let matched = false;
    
    // Check for user patterns
    for (const pattern of userPatterns) {
      if (pattern.test(line)) {
        saveCurrentMessage();
        currentRole = 'user';
        currentContent.push(line.replace(pattern, ''));
        matched = true;
        break;
      }
    }
    
    // Check for assistant patterns
    if (!matched) {
      for (const pattern of assistantPatterns) {
        if (pattern.test(line)) {
          saveCurrentMessage();
          currentRole = 'assistant';
          currentContent.push(line.replace(pattern, ''));
          matched = true;
          break;
        }
      }
    }
    
    // If no pattern matched and we have a current role, add to content
    if (!matched && currentRole) {
      currentContent.push(line);
    }
  });
  
  // Save last message
  saveCurrentMessage();
  
  return messages;
}

function processInput() {
  // If paste area has content and no file was uploaded
  if (pasteArea.value.trim() && parsedConversation.length === 0) {
    parsedConversation = parsePlainText(pasteArea.value);
  }
  
  if (parsedConversation.length > 0) {
    // Select all by default
    parsedConversation.forEach((_, i) => selectedMessages.add(i));
    nextStep();
  }
}

// === Message Selection (Step 3) ===
function renderMessagesList() {
  const list = document.getElementById('messagesList');
  const totalCount = document.getElementById('totalCount');
  const selectedCount = document.getElementById('selectedCount');
  
  if (parsedConversation.length === 0) {
    list.innerHTML = '<div class="empty-state"><p>No conversation loaded yet. Go back and upload or paste your chat history.</p></div>';
    return;
  }
  
  totalCount.textContent = parsedConversation.length;
  
  list.innerHTML = parsedConversation.map((msg, i) => `
    <div class="message-item ${selectedMessages.has(i) ? 'selected' : ''}" data-index="${i}" onclick="toggleMessage(${i})">
      <input type="checkbox" class="message-checkbox" ${selectedMessages.has(i) ? 'checked' : ''}>
      <div class="message-content-preview">
        <div class="message-role ${msg.role}">${msg.role}</div>
        <div class="message-text">${escapeHtml(msg.content.substring(0, 200))}${msg.content.length > 200 ? '...' : ''}</div>
      </div>
    </div>
  `).join('');
  
  updateSelectedCount();
}

function toggleMessage(index) {
  if (selectedMessages.has(index)) {
    selectedMessages.delete(index);
  } else {
    selectedMessages.add(index);
  }
  
  const item = document.querySelector(`.message-item[data-index="${index}"]`);
  item.classList.toggle('selected');
  item.querySelector('.message-checkbox').checked = selectedMessages.has(index);
  
  updateSelectedCount();
}

function selectAll() {
  parsedConversation.forEach((_, i) => selectedMessages.add(i));
  renderMessagesList();
}

function deselectAll() {
  selectedMessages.clear();
  renderMessagesList();
}

function updateSelectedCount() {
  const selectedCount = document.getElementById('selectedCount');
  const reviewBtn = document.getElementById('reviewBtn');
  
  selectedCount.textContent = selectedMessages.size;
  reviewBtn.disabled = selectedMessages.size === 0;
}

// === Review & Redact (Step 4) ===
function renderReviewPreview() {
  const preview = document.getElementById('reviewPreview');
  
  const selectedMsgs = parsedConversation.filter((_, i) => selectedMessages.has(i));
  
  preview.innerHTML = selectedMsgs.map((msg, i) => {
    const originalIndex = Array.from(selectedMessages)[i];
    let content = escapeHtml(msg.content);
    
    // Apply existing redactions
    if (redactions.has(originalIndex)) {
      const ranges = redactions.get(originalIndex);
      // Apply redactions in reverse order to maintain positions
      ranges.sort((a, b) => b.start - a.start);
      ranges.forEach(range => {
        const before = content.substring(0, range.start);
        const after = content.substring(range.end);
        content = before + `<span class="redacted" onclick="undoRedaction(${originalIndex}, ${range.start}, ${range.end})">[REDACTED]</span>` + after;
      });
    }
    
    return `
      <div class="review-message ${msg.role}">
        <div class="review-message-role">${msg.role}</div>
        <div class="review-message-content" data-index="${originalIndex}">${content}</div>
      </div>
    `;
  }).join('');
  
  updateRedactionCount();
}

function autoRedact() {
  const redactApiKeys = document.getElementById('redactApiKeys').checked;
  const redactEmails = document.getElementById('redactEmails').checked;
  const redactUrls = document.getElementById('redactUrls').checked;
  const redactPaths = document.getElementById('redactPaths').checked;
  
  parsedConversation.forEach((msg, i) => {
    if (!selectedMessages.has(i)) return;
    
    const content = msg.content;
    let ranges = redactions.get(i) || [];
    
    // API Keys / Tokens patterns
    if (redactApiKeys) {
      const apiPatterns = [
        /sk-[a-zA-Z0-9]{20,}/g,  // OpenAI
        /pk_live_[a-zA-Z0-9]+/g, // Stripe
        /sk_live_[a-zA-Z0-9]+/g,
        /ghp_[a-zA-Z0-9]{36}/g,  // GitHub
        /glpat-[a-zA-Z0-9\-_]{20}/g, // GitLab
        /xox[baprs]-[0-9a-zA-Z\-]+/g, // Slack
        /AIza[0-9A-Za-z\-_]{35}/g, // Google API
        /[a-zA-Z0-9]{32,}/g // Generic long alphanumeric strings (might be tokens)
      ];
      
      apiPatterns.forEach(pattern => {
        let match;
        while ((match = pattern.exec(content)) !== null) {
          // Skip if it's too short or too common
          if (match[0].length > 30) {
            ranges.push({ start: match.index, end: match.index + match[0].length });
          }
        }
      });
    }
    
    // Email patterns
    if (redactEmails) {
      const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
      let match;
      while ((match = emailPattern.exec(content)) !== null) {
        ranges.push({ start: match.index, end: match.index + match[0].length });
      }
    }
    
    // URL patterns
    if (redactUrls) {
      const urlPattern = /https?:\/\/[^\s<>"{}|\\^`\[\]]+/g;
      let match;
      while ((match = urlPattern.exec(content)) !== null) {
        ranges.push({ start: match.index, end: match.index + match[0].length });
      }
    }
    
    // File paths with usernames
    if (redactPaths) {
      const pathPatterns = [
        /\/Users\/[^\/\s]+/g,      // macOS
        /\/home\/[^\/\s]+/g,       // Linux
        /C:\\Users\\[^\\s]+/g,     // Windows
        /~\/[^\s]+/g               // Home paths
      ];
      
      pathPatterns.forEach(pattern => {
        let match;
        while ((match = pattern.exec(content)) !== null) {
          ranges.push({ start: match.index, end: match.index + match[0].length });
        }
      });
    }
    
    // Merge overlapping ranges
    ranges = mergeRanges(ranges);
    
    if (ranges.length > 0) {
      redactions.set(i, ranges);
    }
  });
  
  renderReviewPreview();
}

function mergeRanges(ranges) {
  if (ranges.length === 0) return [];
  
  ranges.sort((a, b) => a.start - b.start);
  const merged = [ranges[0]];
  
  for (let i = 1; i < ranges.length; i++) {
    const last = merged[merged.length - 1];
    if (ranges[i].start <= last.end) {
      last.end = Math.max(last.end, ranges[i].end);
    } else {
      merged.push(ranges[i]);
    }
  }
  
  return merged;
}

function undoRedaction(messageIndex, start, end) {
  if (redactions.has(messageIndex)) {
    let ranges = redactions.get(messageIndex);
    ranges = ranges.filter(r => !(r.start === start && r.end === end));
    if (ranges.length === 0) {
      redactions.delete(messageIndex);
    } else {
      redactions.set(messageIndex, ranges);
    }
    renderReviewPreview();
  }
}

function clearRedactions() {
  redactions.clear();
  renderReviewPreview();
}

function updateRedactionCount() {
  let count = 0;
  redactions.forEach(ranges => count += ranges.length);
  
  document.querySelector('.redaction-count').textContent = `${count} item${count !== 1 ? 's' : ''} redacted`;
}

// === Export (Step 5) ===
function updateExportSummary() {
  document.getElementById('summaryMessages').textContent = selectedMessages.size;
  document.getElementById('summaryPrompts').textContent = 
    parsedConversation.filter((msg, i) => selectedMessages.has(i) && msg.role === 'user').length;
  
  let redactedCount = 0;
  redactions.forEach(ranges => redactedCount += ranges.length);
  document.getElementById('summaryRedacted').textContent = redactedCount;
}

function getExportData() {
  const selectedMsgs = parsedConversation.filter((_, i) => selectedMessages.has(i));
  
  // Apply redactions to content
  const processedMessages = selectedMsgs.map((msg, i) => {
    const originalIndex = Array.from(selectedMessages)[i];
    let content = msg.content;
    
    if (redactions.has(originalIndex)) {
      const ranges = redactions.get(originalIndex);
      ranges.sort((a, b) => b.start - a.start);
      ranges.forEach(range => {
        content = content.substring(0, range.start) + '[REDACTED]' + content.substring(range.end);
      });
    }
    
    return {
      role: msg.role,
      content: content
    };
  });
  
  return {
    meta: {
      title: document.getElementById('showcaseTitle').value || 'Untitled Showcase',
      description: document.getElementById('showcaseDescription').value || '',
      category: document.getElementById('category').value,
      price: parseFloat(document.getElementById('price').value) || 0,
      creator: document.getElementById('creatorName').value || 'Anonymous',
      exportedAt: new Date().toISOString(),
      stats: {
        totalMessages: selectedMessages.size,
        userPrompts: processedMessages.filter(m => m.role === 'user').length,
        redactedItems: Array.from(redactions.values()).reduce((sum, arr) => sum + arr.length, 0)
      }
    },
    messages: processedMessages
  };
}

function downloadJSON() {
  const data = getExportData();
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `showcase-${Date.now()}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function submitShowcase() {
  // TODO: Integrate with backend
  alert('Submission to gallery coming soon!\n\nFor now, download the JSON file and reach out to us to get listed.');
  downloadJSON();
}

// === OS Path Selector ===
const paths = {
  mac: '~/Library/Application Support/Cursor/User/workspaceStorage/',
  windows: '%APPDATA%\\Cursor\\User\\workspaceStorage\\',
  linux: '~/.config/Cursor/User/workspaceStorage/'
};

document.querySelectorAll('.os-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.os-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById('dbPath').textContent = paths[tab.dataset.os];
  });
});

function copyPath() {
  const path = document.getElementById('dbPath').textContent;
  navigator.clipboard.writeText(path);
  
  const btn = document.querySelector('.copy-path-btn');
  btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>';
  setTimeout(() => {
    btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';
  }, 2000);
}

// === Utility Functions ===
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

