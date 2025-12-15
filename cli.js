#!/usr/bin/env node

const { Command } = require('commander');
const fs = require('fs');
const path = require('path');
const PromptHistory = require('./index.js');

const program = new Command();

const HISTORY_FILE = '.prmpt-hstry.json';
const history = new PromptHistory(HISTORY_FILE);

program
  .name('prmpt-hstry')
  .description('Track and share your AI prompt history')
  .version('1.0.0');

// Initialize a new prompt history
program
  .command('init')
  .description('Initialize a new prompt history for your project')
  .option('-n, --name <name>', 'Project name')
  .option('-d, --description <description>', 'Project description')
  .action((options) => {
    try {
      if (fs.existsSync(HISTORY_FILE)) {
        console.log('Prompt history already exists. Use "add" to add new prompts.');
        return;
      }
      
      history.init(options.name || '', options.description || '');
      console.log('✓ Initialized prompt history');
      if (options.name) console.log(`  Project: ${options.name}`);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exit(1);
    }
  });

// Add a prompt to the history
program
  .command('add')
  .description('Add a new prompt to the history')
  .option('-p, --prompt <text>', 'The prompt text')
  .option('-r, --response <text>', 'The response/output')
  .option('-t, --tags <tags>', 'Comma-separated tags')
  .option('-n, --note <note>', 'Additional notes')
  .action((options) => {
    try {
      if (!options.prompt) {
        console.error('Error: Prompt text is required. Use -p or --prompt');
        process.exit(1);
      }
      
      const tags = options.tags ? options.tags.split(',').map(t => t.trim()) : [];
      const entry = history.addPrompt(
        options.prompt,
        options.response || '',
        tags,
        options.note || ''
      );
      
      console.log(`✓ Added prompt #${entry.id}`);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exit(1);
    }
  });

// View the prompt history
program
  .command('view')
  .description('View the prompt history')
  .option('-i, --id <number>', 'View specific prompt by ID')
  .option('-f, --full', 'Show full details')
  .action((options) => {
    const data = history.load();
    
    if (!data || data.prompts.length === 0) {
      console.log('No prompts in history yet. Use "add" to add prompts.');
      return;
    }
    
    if (options.id) {
      const prompt = history.getPrompt(parseInt(options.id));
      if (!prompt) {
        console.log(`Prompt #${options.id} not found.`);
        return;
      }
      console.log('\n' + '='.repeat(60));
      console.log(`Prompt #${prompt.id} - ${new Date(prompt.timestamp).toLocaleString()}`);
      console.log('='.repeat(60));
      console.log('\nPrompt:');
      console.log(prompt.prompt);
      if (prompt.response) {
        console.log('\nResponse:');
        console.log(prompt.response);
      }
      if (prompt.tags.length > 0) {
        console.log('\nTags:', prompt.tags.join(', '));
      }
      if (prompt.note) {
        console.log('\nNote:', prompt.note);
      }
      console.log('\n');
    } else {
      if (data.project) {
        console.log(`\nProject: ${data.project}`);
      }
      if (data.description) {
        console.log(`Description: ${data.description}\n`);
      }
      console.log(`Total prompts: ${data.prompts.length}\n`);
      
      data.prompts.forEach(p => {
        console.log(`#${p.id} - ${new Date(p.timestamp).toLocaleString()}`);
        if (options.full) {
          console.log(`  Prompt: ${p.prompt.substring(0, 100)}${p.prompt.length > 100 ? '...' : ''}`);
          if (p.tags.length > 0) {
            console.log(`  Tags: ${p.tags.join(', ')}`);
          }
        }
        console.log();
      });
    }
  });

// Export the history
program
  .command('export')
  .description('Export the prompt history')
  .option('-o, --output <file>', 'Output file (default: prmpt-hstry-export.json)')
  .option('-m, --markdown', 'Export as Markdown instead of JSON')
  .action((options) => {
    const outputFile = options.output || (options.markdown ? 'prmpt-hstry-export.md' : 'prmpt-hstry-export.json');
    
    try {
      if (options.markdown) {
        history.exportToMarkdown(outputFile);
      } else {
        history.exportToJson(outputFile);
      }
      console.log(`✓ Exported to ${outputFile}`);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exit(1);
    }
  });

// Clear/reset history
program
  .command('clear')
  .description('Clear all prompts from history')
  .option('-f, --force', 'Skip confirmation')
  .action((options) => {
    if (!fs.existsSync(HISTORY_FILE)) {
      console.log('No history file found.');
      return;
    }
    
    if (!options.force) {
      console.log('This will delete all prompts. Use --force to confirm.');
      return;
    }
    
    history.clear();
    console.log('✓ History cleared');
  });

program.parse();
