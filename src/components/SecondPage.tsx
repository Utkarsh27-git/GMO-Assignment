import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import axios from 'axios';
import { Container, Typography } from '@mui/material';
import DepartmentList from './DepartmentList';

const SecondPage: React.FC = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => setData(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'title', headerName: 'Title', width: 130 },
    { field: 'body', headerName: 'Body', width: 230 }
  ];

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Table
      </Typography>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid rows={data} columns={columns} pageSizeOptions={[5]}
          pagination />
      </div>
      <DepartmentList />
    </Container>
  );
};

export default SecondPage;
