import { ContactsCollection } from "../db/models/modelsContacts.js";

export const getAllContacts = async () => {
    const contacts = await ContactsCollection.find();
    console.log('Contacts found:', contacts);
    return contacts;
 };

export const getContactsById = async contactId => {
    const contact = await ContactsCollection.findById(contactId);
    return contact;
};
