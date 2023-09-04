const yargs = require('yargs')
const pkg = require('./package.json')
const {addNote, printNotes, deleteNote, editNote} = require('./notes.controller')

yargs.version(pkg.version)

yargs.command({
  command: 'add',
  describe: 'Add new note to list',
  builder: {
    title: {
      type: 'string',
      describe: 'Note title',
      demandOption: true
    }
  },
  handler({ title }) {
    addNote(title)
  }
})

yargs.command({
  command: 'list',
  describe: 'Print all notes',
  async handler() {
    printNotes()
  }
})

yargs.command({
  command: 'remove',
  describe: 'Remove note by id',
  builder: {
    id: {
      type: 'string',
      describe: 'Note uniq id',
      demandOption: true
    }
  },
  async handler({ id }) {
    deleteNote(id)
  }
})

yargs.command({
  command: 'edit',
  describe: 'Edit note by id',
  builder: {
    id: {
      type: 'string',
      describe: 'Note uniq id',
      demandOption: true
    },
    title: {
      type: 'string',
      describe: 'Note title',
      demandOption: true
    }
  },
  async handler({id, title}) {
    editNote(id, title)
  }
})

yargs.parse()