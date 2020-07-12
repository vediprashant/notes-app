
const yargs = require('yargs');

const notes = require('./notes');

const { required } = require('yargs');


// Adding a note

yargs.command({
    command : 'add',
    description: 'adding a note',
    builder : {
        title : {
            descibe : 'Title of the note',
            demandOption : true,
            type : 'string'
        },
        body : {
            describe : 'Content for your note',
            demandOption : true,
            type : 'string'
        }
    },
    handler : argv => {
        notes.addNotes(argv.title, argv.body);
    }
})

// Removing a note

yargs.command({
    command : 'remove',
    description: 'removing a note',
    builder: {
        title : {
            describe : 'title of the note',
            demandOption : true,
            type : 'string'
        }
    },
    handler : argv => {
        notes.removeNote(argv.title);
    }
})

//listing notes
yargs.command({
    command : 'list',
    description: 'listing notes',
    handler(){
        notes.listNotes();
    }
})

// reading notes
yargs.command({
    command : 'read',
    description: 'reading a note',
    builder : {
        title : {
            describe : "reading the note",
            demandOption : true,
            type : 'string'
        }
    },
    handler : function(argv){
        notes.readNote(argv.title);
    }
})

yargs.parse();