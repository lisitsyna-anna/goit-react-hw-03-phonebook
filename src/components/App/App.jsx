import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix';

import { Container } from 'components/Container';
import { ContactForm } from 'components/ContactForm';
import { Filter } from 'components/Filter';
import { ContactList } from 'components/ContactList';

import { PageTitle, SectionTitle, Text } from './App.styled';

import { HiSearch } from 'react-icons/hi';

const CONTACTS_KEY = 'contacts';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem(CONTACTS_KEY);
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(_, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem(CONTACTS_KEY, JSON.stringify(this.state.contacts));
    }
  }

  addNewContact = values => {
    const { name, number } = values;
    const { contacts } = this.state;
    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    const isNameAdded = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    const isNumberAdded = contacts.some(contact => contact.number === number);

    if (isNameAdded) {
      Notify.failure(`${name} is alredy in contacts`);
      return false;
    } else if (isNumberAdded) {
      Notify.failure(`${number} is alredy in contacts`);
      return false;
    }

    this.setState(({ contacts }) => ({
      contacts: [newContact, ...contacts],
    }));

    return true;
  };

  onChangeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  deleteContact = idItem => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(constact => constact.id !== idItem),
    }));
  };

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;

    const normalizeFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter)
    );
  };

  render() {
    const { filter, contacts } = this.state;
    const visibleContacts = this.getVisibleContacts();
    return (
      <Container as="main">
        <Container
          as="div"
          maxWidth={1250}
          pl={15}
          pr={15}
          ml={'auto'}
          mr={'auto'}
        >
          <Container
            as="div"
            width={600}
            ml={'auto'}
            mr={'auto'}
            backgroundColor={'white'}
            p={40}
          >
            <PageTitle>Phonebook</PageTitle>

            <Container as="section" pt={30} pb={30}>
              <ContactForm onSubmit={this.addNewContact} />
            </Container>

            <Container as="section" pt={30} pb={30}>
              <SectionTitle>Contacts</SectionTitle>
              {contacts.length > 1 && (
                <Filter
                  value={filter}
                  onChange={this.onChangeFilter}
                  icon={HiSearch}
                />
              )}

              {contacts.length > 0 ? (
                <ContactList
                  contacts={visibleContacts}
                  onDeleteContact={this.deleteContact}
                />
              ) : (
                <Text>Your phonebook is empty. Please add contact.</Text>
              )}
            </Container>
          </Container>
        </Container>
      </Container>
    );
  }
}
