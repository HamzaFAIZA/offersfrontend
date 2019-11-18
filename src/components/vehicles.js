import React from 'react'
import { Table, Input, Button, Icon, Result } from 'antd';
import Highlighter from 'react-highlight-words';
import axios from 'axios';
import {ALL_VEHICLES as ALL_VEHICLES} from "../constants/links"

class Vehicles extends React.Component {

    state = {
        searchText: '',
        data: [],
        clickedItem: -1
      };

       componentDidMount () {
        
         axios.get(ALL_VEHICLES)
        .then(response => response = response.data)
        .then(res => {
            let structured = Array();
            res.forEach(element => {
                structured.push({
                  key: element.id.S,
                  make: element.car.M.make.S,
                  model: element.car.M.model.S,
                  fueltype: element.car.M.fueltype.S,
                });
            });
            this.setState({data: structured})
        })
      }

      getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div style={{ padding: 8 }}>
            <Input
              ref={node => {
                this.searchInput = node;
              }}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
              style={{ width: 188, marginBottom: 8, display: 'block' }}
            />
            <Button
              type="primary"
              onClick={() => this.handleSearch(selectedKeys, confirm)}
              icon="search"
              size="small"
              style={{ width: 90, marginRight: 8 }}
            >
              Search
            </Button>
            <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
              Reset
            </Button>
          </div>
        ),
        filterIcon: filtered => (
          <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
          record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(() => this.searchInput.select());
          }
        },
        render: text => (
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[this.state.searchText]}
            autoEscape
            textToHighlight={text.toString()}
          />
        ),
      });
    
      handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.setState({ searchText: selectedKeys[0] });
      };
    
      handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
      };
  render() {

      const columns = [
        {
          title: 'make',
          dataIndex: 'make',
          key: 'make',
          width: '30%',
          ...this.getColumnSearchProps('make'),
        },
        {
          title: 'model',
          dataIndex: 'model',
          key: 'model',
          width: '20%',
          ...this.getColumnSearchProps('model'),
        },
        {
          title: 'fueltype',
          dataIndex: 'fueltype',
          key: 'fueltype',
          ...this.getColumnSearchProps('fueltype'),
        },
      ];

    return <Table columns={columns} dataSource={this.state.data} onRow={(record, rowIndex) => {
    return {
      onClick: event => {
          this.props.history.push("/detailed/"+record.key);
          
        }, // click row
    };
  }}/>;
  }
}

export default Vehicles;