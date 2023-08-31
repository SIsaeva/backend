const fs = require('fs/promises')
const path = require('path')
const chalk = require('chalk')

const notesPath = path.join(__dirname, 'db.json')

async function addNote(title) {
    const notes = await getNotes();

    const note= {
        title,
        id: Date.now().toString()
    }
    notes.push(note)
    await fs.writeFile(notesPath, JSON.stringify(notes))
    console.log(chalk.green('note was added'))
}
async function getNotes() {
    const notes = await fs.readFile(notesPath, {encoding:'utf-8'})
    return Array.isArray(JSON.parse(notes))?JSON.parse(notes):[]
}

async function printNotes() {
    const notes = await getNotes()
    console.log(chalk.bgBlackBright('Here is the list of notes: '))
    notes.forEach(note => {
        console.log(chalk.yellow(note.id, note.title))
    })
}

async function deleteNote(id) {
    const notes = await getNotes()
    const index = notes.findIndex(note => note.id === id.toString())
    if (index !== -1) {
        notes.splice(index, 1);
        await fs.writeFile(notesPath, JSON.stringify(notes))
        console.log(chalk.green('note was removed'))
    } else {
        console.log(chalk.redBright(`Note with id = ${id} is not found`))
    }
}


module.exports={
    addNote,printNotes, deleteNote
}