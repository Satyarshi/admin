import React from 'react';
import { Box } from '@adminjs/design-system';

const RoleBadge = (props) => {
  const { record, property } = props;

  const userRole = record?.params?.[property.name] || '';

  const backgroundColor = userRole === 'admin' ? 'green' : 'blue';

  return (
    <Box
      style={{
        borderRadius: '12px',    
        padding: '10px',         
        backgroundColor: backgroundColor,
        color: 'white',          
        display: 'inline-block', 
      }}
    >
      {userRole}  
    </Box>
  );
};

export default RoleBadge;
