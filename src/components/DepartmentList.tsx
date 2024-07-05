import React, { useState } from 'react';
import { Container, Typography, Checkbox, List, ListItem, ListItemText, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const data = [
  {
    department: "Agriculture & Fishing",
    subDepartments: ["Agriculture", "Crops", "Farming Animals & Livestock", "Fishery & Aquaculture", "Ranching"]
  },
  {
    department: "Business Services",
    subDepartments: ["Accounting & Accounting Services", "Auctions", "Business Services - General", "Call Centers & Business Centers", "Career Planning", "Career", "Commercial Printing", "Debt Collection"]
  }
];

const DepartmentList: React.FC = () => {
  const [expanded, setExpanded] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);

  const handleToggleExpand = (department: string) => {
    setExpanded((prev) => prev.includes(department) ? prev.filter(item => item !== department) : [...prev, department]);
  };

  const handleSelect = (item: string) => {
    setSelected((prev) => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
  };

  const handleSelectDepartment = (department: string) => {
    const dept = data.find(d => d.department === department);
    const isAllSelected = dept?.subDepartments.every(sub => selected.includes(sub));
    if (isAllSelected) {
      setSelected((prev) => prev.filter(item => item !== department && !dept?.subDepartments.includes(item)));
    } else {
      if (dept?.subDepartments) {
        setSelected((prev) => [...prev, department, ...dept.subDepartments.filter(sub => !prev.includes(sub))]);
      }
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Departments List
      </Typography>
      <List>
        {data.map((dept) => (
          <React.Fragment key={dept.department}>
            <ListItem>
              <Checkbox
                checked={selected.includes(dept.department) || dept.subDepartments.every(sub => selected.includes(sub))}
                onChange={() => handleSelectDepartment(dept.department)}
              />
              <ListItemText primary={dept.department} />
              <IconButton onClick={() => handleToggleExpand(dept.department)}>
                {expanded.includes(dept.department) ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            </ListItem>
            {expanded.includes(dept.department) && (
              <List component="div" disablePadding>
                {dept.subDepartments.map((sub) => (
                  <ListItem key={sub} sx={{ pl: 4 }}>
                    <Checkbox
                      checked={selected.includes(sub)}
                      onChange={() => handleSelect(sub)}
                    />
                    <ListItemText primary={sub} />
                  </ListItem>
                ))}
              </List>
            )}
          </React.Fragment>
        ))}
      </List>
    </Container>
  );
};

export default DepartmentList;
