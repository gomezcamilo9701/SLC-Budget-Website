import React from 'react';
import { TEventContactsResponse } from '../../types';
import { Avatar, Card, CardHeader, Grid, CardContent, Typography } from '@mui/material';
import { useStyles } from './ContactCardStyle';

interface ContactCardProps {
  eventContact: TEventContactsResponse;
  onAddClick: (contact: TEventContactsResponse) => void;
  isSelected: boolean;
}

const ContactCard: React.FC<ContactCardProps> = ({
  eventContact,
  onAddClick,
  isSelected,
}) => {
  return (
    <Grid container>
      <Grid item xs={12} md={6}>
        <Card
          sx={{
          ...useStyles.principalCard,
          ...(isSelected && useStyles.selectedCard),
          }}
          onClick={() => onAddClick(eventContact)}  
        >
          <CardHeader
            avatar={
              <Avatar src={eventContact.contactProfileImage
                ? eventContact.contactProfileImage
                : ''}
              />
            }
            sx={useStyles.contactCard}
            title={
              <Typography variant="body1" sx={{ fontSize: '0.8rem', textAlign: 'center' }}>
                {eventContact.contactName}
              </Typography>
            }
            subheader={
              <Typography variant="body2" sx={{ fontSize: '0.8rem', textAlign: 'center' }}>
                @{eventContact.contactUsername}
              </Typography>
            }
          />
        </Card>   
      </Grid>
    </Grid>
  );
};

export default ContactCard;
