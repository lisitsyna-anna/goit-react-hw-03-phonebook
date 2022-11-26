import PropTypes from 'prop-types';

import { Button } from 'components/ContactForm/ContactForm.styled';
import { Item, StyledText } from './ContactItem.styled';
import { HiPhone } from 'react-icons/hi';

export const ContactItem = ({ id, name, number, onDeleteContact }) => {
  return (
    <Item>
      <StyledText>
        <HiPhone size={16} />
        <b>{name}:</b> {number}
      </StyledText>
      <Button type="button" onClick={() => onDeleteContact(id)}>
        Delete
      </Button>
    </Item>
  );
};

ContactItem.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};
