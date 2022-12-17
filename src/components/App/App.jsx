import { useEffect, useState } from 'react';
import { Section } from 'components/Section/Section';
import { Forms } from 'components/Forms/Forms';
import { Contacts } from 'components/Contacts/Contacts';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    const saveContacts = localStorage.getItem('contacts');
    return saveContacts ? JSON.parse(saveContacts) : [];
  });
  const [filter, setFilter] = useState('');

  const filterContacts = contacts.length
    ? contacts.filter(contact => contact.name.toLowerCase().includes(filter))
    : [];

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = data => {
    if (contacts.length && contacts.find(item => item.name === data.name))
      return alert(
        'Are you sure about that? "' + data.name + '" is already in contacts.'
      );

    setContacts(state => [...state, data]);
  };

  const selectedContacts = text => {
    setFilter(text.toLowerCase());
  };

  const deleteContact = id => {
    setContacts(state => state.filter(contact => contact.id !== id));
  };

  return (
    <Section>
      <Section title="Phonebook">
        <Forms submit={addContact} />
      </Section>

      {contacts.length > 0 && (
        <Section title="Contacts">
          <Contacts
            contacts={filterContacts}
            onSearch={selectedContacts}
            onDelete={deleteContact}
          />
        </Section>
      )}
    </Section>
  );
};
