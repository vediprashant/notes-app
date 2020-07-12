const fs = require('fs');
const chalk = require('chalk');
const getNotes = () => 'Your notes...';

const addNotes = (title,body) => {
    const notes = loadNotes();
    const duplicateNotes = notes.filter(note => note.title === title);
    if(duplicateNotes.length>0){
        console.log(chalk.red.inverse("Title already Present") );
        return;
    }
    notes.push({
        title : title,
        body : body
    })
    const saveNote = JSON.stringify(notes);
    fs.writeFileSync('notes.json',saveNote);
    console.log(chalk.green.bold("Notes Added"));
}

const removeNote = (title) => {
    const notes = loadNotes();

    const newNotes = notes.filter( note => !(note.title === title));

    if(notes.length == newNotes.length){
        console.log(chalk.red.inverse("No Such Note Found"));
        return;
    }
    const saveNote = JSON.stringify(newNotes);
    fs.writeFileSync('notes.json',saveNote);
    console.log(chalk.green.bold("Note has been deleted"));
}

const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.magenta("Your Notes..."));
    notes.forEach(note => {
        console.log(chalk.cyan(note.title));
    });
}

const loadNotes = () => {
  try {
   const bitdata = fs.readFileSync('notes.json');
   const dataJSON = bitdata.toString();
   const note = JSON.parse(dataJSON);
   return note;
  } catch(err){
      return [];
  }
}

const readNote = (title) => {
    const notes = loadNotes();

    const reader = notes.find( (note) => note.title === title );
    
    if(reader){
        console.log(chalk.inverse(reader.title));
        console.log(reader.body);
    } else {
        console.log(chalk.red.inverse("Title Not found"));
    }
}


const notes = {
    getNotes : getNotes,
    addNotes : addNotes,
    removeNote : removeNote,
    listNotes : listNotes,
    readNote : readNote
};

module.exports = notes;