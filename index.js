const contacts = require("./contacts");
// const yargs = require("yargs");
// const { hideBin } = require("yargs/helpers");

const { Command } = require("commander");
const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);
const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      return console.table(allContacts);
    case "get":
      const contact = await contacts.getContactById(id);
      return console.log(contact);
    case "remove":
      const result = await contacts.removeContact(id);
      return console.log(result);
    case "add": {
      const result = await contacts.addContact({ name, email, phone });
      return console.log(result);
    }
    default:
      console.warn("\x1B[31m Unknown action type!");
      break;
  }
};

// invokeAction({ action: "list" });
// invokeAction({ action: "get", id: "e6ywwRe4jcqxXfCZOj_1e" });
// invokeAction({ action: "remove", id: "wEDQhnEQqAhFO-vcon_gW" });
// invokeAction({ action: "add", name: "Andrew", email: "a@a.a", phone: "020000333222" });

// const res = hideBin(process.argv);
// const { argv } = yargs(res);
// console.log(argv);
// invokeAction(argv);

invokeAction(argv);
