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
    await saveNotes(notes)
    console.log(chalk.green('note was added'))
}
async function getNotes() {
    const notes = await fs.readFile(notesPath, {encoding:'utf-8'})
    return Array.isArray(JSON.parse(notes))?JSON.parse(notes):[]
}

async function saveNotes(notes) {
    await fs.writeFile(notesPath, JSON.stringify(notes))
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
    const filteredNotes = notes.filter(note => note.id !== id)
    if (filteredNotes.length < notes.length) {
        await saveNotes(filteredNotes)
        console.log(chalk.green(`Note with id = ${id} was removed`))
    } else {
        console.log(chalk.redBright(`Note with id = ${id} is not found`))
    }
}

async function editNote(id, title) {
    const notes = await getNotes();
    const newNotes = notes.map(note => {
        return { "id": note.id, "title": note.id === id ? title : note.title}
    })
    await saveNotes(newNotes)
    console.log(chalk.green(`Note with id=${id} was edited`))
}


module.exports={
    addNote, printNotes, getNotes, deleteNote, editNote
}