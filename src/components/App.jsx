import React from "react";
import { Component } from "react";
import { Form } from "./Form/Form";
import { Filter } from "components/Filter/Filter";
import { ContactsList } from "./ContactsList/ContactsList";


export class App extends Component {
  state = {
    contacts: [
      {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
      {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
     {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ],
    filter: '',
       };

  handleSubmit = data => {
   this.setState(({contacts}) => 
   contacts.find(contact => contact.name === data.name)
    ? alert(`${data.name} is already in contacts`)
     : { contacts: [...contacts, data]});
  };

  changeFilter = e => {
    this.setState({filter: e.currentTarget.value});
  };
  
  filteredContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

  return (contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter),
  )) 
  };

  deleteContacts = ( contactId ) => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  componentDidMount() {
    console.log('App componentDidMount');

    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
       this.setState({ contacts: parsedContacts });
    }

  }

  componentDidUpdate(prevProps, prevState) {
    console.log('App componentDidUpdate');

    if (this.state.contacts !== prevState.contacts) {
      console.log('changed')

      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const { filter } = this.state;

  return (
    <div
        style={{
        margin: '0 40px',
       }}
    >
      <h1>Phonebook</h1>
      <Form onSubmit={this.handleSubmit}/>
      <h2>Contacts</h2>
      <Filter value={filter} onChange={this.changeFilter}/>
      <ContactsList contacts={this.filteredContacts()} onDeleteContact={this.deleteContacts}/>
    </div>
  );
  }
};