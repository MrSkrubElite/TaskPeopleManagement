import React, { useState } from 'react';
import data from './data.json';
import './App.css';


function FilterComponent({ onFilter }) {
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');

  const handleFilter = () => {
    onFilter({ name, department });
  };

  return (
    <div className="filter-container">
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Department:
        <select value={department} onChange={(e) => setDepartment(e.target.value)}>
          <option value="">All</option>
          <option value="1">IT</option>
          <option value="2">Marketing</option>
        </select>
      </label>
      <button className='filter-button' onClick={handleFilter}>Filter</button>
    </div>
  );
}

function ListComponent({ employees, onEdit, onDelete, onAdd }) {
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleActions = (index) => {
    setSelectedEmployee(index);
  };

  const handleAddPerson = () => {
    onAdd();
    setSelectedEmployee(employees.length);
  };

  return (
    <div>
      <ul className="employee-list">
        <li className="employee-item employee-header">
          <span>PERSON NAME</span>
          <span>DEPARTMENT</span>
        </li>
        {employees.map((employee, index) => (
          <li key={index} className="employee-item">
            <span>{employee.name}</span>
            <span>{employee.department === 1 ? 'IT' : 'Marketing'}</span>
            <div className="actions-container">
              {selectedEmployee === index ? (
                <Popup
                  employee={employee}
                  onClose={() => setSelectedEmployee(null)}
                  onEdit={(updatedEmployee) => {
                    onEdit(index, updatedEmployee);
                    setSelectedEmployee(null);
                  }}
                  onDelete={() => {
                    onDelete(index);
                    setSelectedEmployee(null);
                  }}
                />
              ) : (
                <button className="actions-button" onClick={() => handleActions(index)}>
                  Actions
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
      <button className="add-person-button" onClick={handleAddPerson}>
        Add Person
      </button>
    </div>
  );
}

function Popup({ employee, onClose, onEdit, onDelete }) {
  const [name, setName] = useState(employee.name);
  const [department, setDepartment] = useState(employee.department.toString());

  const handleSubmit = (e) => {
    e.preventDefault();
    onEdit({ name, department: parseInt(department) });
    onClose();
  };

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <form className="popup-form" onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <label>
            Department:
            <select value={department} onChange={(e) => setDepartment(e.target.value)}>
              <option value="1">IT</option>
              <option value="2">Marketing</option>
            </select>
          </label>
          <div className="popup-buttons">
            <button type="submit">Save</button>
            <button onClick={onDelete}>Delete</button>
            <button onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function App() {
  const [employees, setEmployees] = useState(data);
  const [filter, setFilter] = useState({ name: '', department: '' });

  const handleFilter = ({ name, department }) => {
    setFilter({ name, department });
  };

  const handleDelete = (index) => {
    const updatedEmployees = [...employees];
    updatedEmployees.splice(index, 1);
    setEmployees(updatedEmployees);
  };

  const handleEdit = (index, updatedEmployee) => {
    const updatedEmployees = [...employees];
    updatedEmployees[index] = updatedEmployee;
    setEmployees(updatedEmployees);
  };

  const handleAdd = () => {
    const newEmployee = { name: '', department: 1 };
    setEmployees([...employees, newEmployee]);
  };

  return (
    <div className="app-container">
      <h1>Employee Management</h1>
      <FilterComponent onFilter={handleFilter} />
      <ListComponent
        employees={employees.filter((employee) => {
          const nameMatch = employee.name.toLowerCase().includes(filter.name.toLowerCase());
          const departmentMatch =
            filter.department === '' || employee.department.toString() === filter.department;
          return nameMatch && departmentMatch;
        })}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onAdd={handleAdd}
      />
    </div>
  );
}

export default App;
