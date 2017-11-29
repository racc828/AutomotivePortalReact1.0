import React from 'react'
import ClientNavigationItem from './ClientNavigationItem'

const ClientNavigation = (props) => {
  return (
    <div>
      <ul>
        {props.clients.map((client, i) => {
          return <ClientNavigationItem setActiveClient={props.setActiveClient} key={i} client={client} />
        })}
      </ul>
    </div>
  );
};

export default ClientNavigation;
