import {Button, Icon, Input} from "antd"
import React from "react"

export default  function (dataIndex,component) {
    const getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        component.searchInput = node;
                    }}
                    placeholder={`请输入考卷名称`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Button
                    type="primary"
                    onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    icon="search"
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                >
                    搜索
                </Button>
                <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                    重置
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
                setTimeout(() => component.searchInput.select());
            }
        },
    });
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        component.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };
    const handleReset = clearFilters => {
        clearFilters();
        component.setState({ searchText: '' });
    };
   return getColumnSearchProps(dataIndex)
}

