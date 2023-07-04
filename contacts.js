const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db/contacts.json");

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(contacts);
};

const getContactById = async (id) => {
  const data = await listContacts();
  return data.find((contact) => contact.id === id) || null;
};

const removeContact = async (id) => {
  const data = await listContacts();
  const index = data.findIndex((contact) => contact.id === id);
  if (index === -1) return null;
  const [removed] = data.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return removed;
};

const addContact = async (contact) => {
  const newContact = { ...contact, id: nanoid() };
  const data = await listContacts();
  data.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  //   getContact,
  removeContact,
  addContact,
};



// const getContact = async (data) => {
//   const { id = null, name = null, email = null, phone = null } = data;
//   searchParam = id
//     ? "id"
//     : name
//     ? "name"
//     : email
//     ? "email"
//     : phone
//     ? "phone"
//     : null;
//   if (!searchParam) return "no params to find contact";
//   const fileData = await fs.readFile(contactsPath, "utf-8");
//   const contact = JSON.parse(fileData).filter(
//     (contact) => contact[searchParam] === data[searchParam]
//   );
//   if (contact.length === 0) return "there are no contact with this params";
//   return contact;
// };
