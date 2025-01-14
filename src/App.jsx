import { useState } from "react";
import {
  Table,
  Button,
  Input,
  Row,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const VehicleTable = () => {
  const [columnsDropdownOpen, setColumnsDropdownOpen] = useState(false);
  const [stateDropdownOpen, setStateDropdownOpen] = useState(false);
  const [dateDropdownOpen, setDateDropdownOpen] = useState(false);
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);

  const [visibleColumns, setVisibleColumns] = useState({
    srNo: true,
    vehicleNumber: true,
    gateInTime: true,
    registration: true,
    status: true,
    dock: true,
    dockInTime: true,
    dockOutTime: true,
    gateOutTime: true,
    view: true,
  });

  const [filters, setFilters] = useState({
    states: [],
    dates: [],
    status: [],
  });

  const vehicleData = [
    {
      srNo: 1,
      vehicleNumber: "MH04GR4142",
      gateInTime: "13/01/2025 14:00",
      status: "Registered",
    },
    {
      srNo: 2,
      vehicleNumber: "KA35D2357",
      gateInTime: "14/01/2025 10:30",
      status: "Unregistered",
    },
    {
      srNo: 3,
      vehicleNumber: "GJ27J0542",
      gateInTime: "15/01/2025 12:15",
      status: "Registered",
    },
    {
      srNo: 4,
      vehicleNumber: "RJ14GR314",
      gateInTime: "16/01/2025 08:45",
      status: "Unregistered",
    },
    {
      srNo: 5,
      vehicleNumber: "GA09AB1234",
      gateInTime: "17/01/2025 16:20",
      status: "Registered",
    },
    {
      srNo: 6,
      vehicleNumber: "MH04GR4142",
      gateInTime: "13/01/2025 1:20",
      status: "Unregistered",
    },
    {
      srNo: 7,
      vehicleNumber: "KA35D2357",
      gateInTime: "14/01/2025 6:20",
      status: "Unregistered",
    },
    {
      srNo: 8,
      vehicleNumber: "GJ27J0542",
      gateInTime: "15/01/2025 12:20",
      status: "Registered",
    },
    {
      srNo: 9,
      vehicleNumber: "RJ14GR314",
      gateInTime: "16/01/2025 16:16",
      status: "Registered",
    },
    {
      srNo: 10,
      vehicleNumber: "GA09AB1234",
      gateInTime: "17/01/2025 11:11",
      status: "Unregistered",
    },
  ];

  const toggleDropdown = (dropdown) => {
    if (dropdown === "columns") setColumnsDropdownOpen(!columnsDropdownOpen);
    if (dropdown === "state") setStateDropdownOpen(!stateDropdownOpen);
    if (dropdown === "date") setDateDropdownOpen(!dateDropdownOpen);
    if (dropdown === "status") setStatusDropdownOpen(!statusDropdownOpen);
  };

  const handleColumnToggle = (column) => {
    setVisibleColumns({
      ...visibleColumns,
      [column]: !visibleColumns[column],
    });
  };

  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => {
      const currentValues = prevFilters[filterType];
      const updatedValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];
      return { ...prevFilters, [filterType]: updatedValues };
    });
  };

  const filteredData = vehicleData.filter((item) => {
    const matchesState =
      filters.states.length === 0 ||
      filters.states.some((state) => item.vehicleNumber.startsWith(state));
    const matchesDate =
      filters.dates.length === 0 ||
      filters.dates.includes(item.gateInTime.split(" ")[0]);
    const matchesStatus =
      filters.status.length === 0 || filters.status.includes(item.status);
    return matchesState && matchesDate && matchesStatus;
  });

  return (
    <div className="nayan">
      <div className="mt-5 katiyara">
        <Row className="mb-3">
          <Col md="3">
            <Input type="date" placeholder="Start Date" />
          </Col>
          <Col md="3">
            <Input type="date" placeholder="End Date" />
          </Col>
          <Col md="3">
            <Input
              type="text"
              placeholder="Search by Customer Name, Vehicle No."
            />
          </Col>
          <Col md="3">
            <Button color="primary">Filter</Button>
          </Col>
        </Row>
        <h5 className="text-center mb-2">Total Gated In Vehicles</h5>
        <Row className="mb-3">
          <Col md="9" className="d-flex align-items-center">
            <Dropdown
              isOpen={stateDropdownOpen}
              toggle={() => toggleDropdown("state")}
            >
              <DropdownToggle caret color="primary">
                Vehicle Number
              </DropdownToggle>
              <DropdownMenu>
                {["MH", "KA", "GJ", "GA", "RJ"].map((state) => (
                  <DropdownItem key={state} toggle={false}>
                    <Input
                      type="checkbox"
                      checked={filters.states.includes(state)}
                      onChange={() => handleFilterChange("states", state)}
                    />
                    {state}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown
              isOpen={dateDropdownOpen}
              toggle={() => toggleDropdown("date")}
              className="ms-2"
            >
              <DropdownToggle caret color="primary">
                Gate In Time
              </DropdownToggle>
              <DropdownMenu>
                {[
                  "13/01/2025",
                  "14/01/2025",
                  "15/01/2025",
                  "16/01/2025",
                  "17/01/2025",
                ].map((date) => (
                  <DropdownItem key={date} toggle={false}>
                    <Input
                      type="checkbox"
                      checked={filters.dates.includes(date)}
                      onChange={() => handleFilterChange("dates", date)}
                    />
                    {date}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown
              isOpen={statusDropdownOpen}
              toggle={() => toggleDropdown("status")}
              className="ms-2"
            >
              <DropdownToggle caret color="primary">
                Status
              </DropdownToggle>
              <DropdownMenu>
                {["Registered", "Unregistered"].map((status) => (
                  <DropdownItem key={status} toggle={false}>
                    <Input
                      type="checkbox"
                      checked={filters.status.includes(status)}
                      onChange={() => handleFilterChange("status", status)}
                    />
                    {status}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </Col>
          <Col md="3" className="d-flex justify-content-end">
            <Dropdown
              isOpen={columnsDropdownOpen}
              toggle={() => toggleDropdown("columns")}
            >
              <DropdownToggle caret color="primary">
                Columns
              </DropdownToggle>
              <DropdownMenu>
                {Object.keys(visibleColumns).map((column) => (
                  <DropdownItem key={column} toggle={false}>
                    <Input
                      type="checkbox"
                      checked={visibleColumns[column]}
                      onChange={() => handleColumnToggle(column)}
                    />
                    {column.replace(/([A-Z])/g, " $1").trim()}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </Col>
        </Row>
        <Table bordered>
          <thead>
            <tr>
              {visibleColumns.srNo && <th>Sr. No</th>}
              {visibleColumns.vehicleNumber && <th>Vehicle Number</th>}
              {visibleColumns.gateInTime && <th>Gate in time</th>}
              {visibleColumns.registration && <th>Registration</th>}
              {visibleColumns.status && <th>Status</th>}
              {visibleColumns.dock && <th>Dock</th>}
              {visibleColumns.dockInTime && <th>Dock in time</th>}
              {visibleColumns.dockOutTime && <th>Dock out time</th>}
              {visibleColumns.gateOutTime && <th>Gate out time</th>}
              {visibleColumns.view && <th>View</th>}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.srNo}>
                {visibleColumns.srNo && <td>{item.srNo}</td>}
                {visibleColumns.vehicleNumber && <td>{item.vehicleNumber}</td>}
                {visibleColumns.gateInTime && <td>{item.gateInTime}</td>}
                {visibleColumns.registration && <td>--</td>}
                {visibleColumns.status && (
                  <td>
                    <span
                      style={{
                        backgroundColor:
                          item.status === "Registered" ? "#d4edda" : "#f8d7da",
                        color:
                          item.status === "Registered" ? "#155724" : "#721c24",
                        padding: "5px 10px",
                        borderRadius: "5px",
                        display: "inline-block",
                      }}
                    >
                      {item.status}
                    </span>
                  </td>
                )}
                {visibleColumns.dock && <td>--</td>}
                {visibleColumns.dockInTime && <td>--</td>}
                {visibleColumns.dockOutTime && <td>--</td>}
                {visibleColumns.gateOutTime && <td>--</td>}
                {visibleColumns.view && (
                  <td>
                    <Button color="link">
                      <i className="bi bi-eye"></i>
                    </Button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
        <Row>
          <Col md="6" className="text-start">
            <Button color="primary">Back</Button>
          </Col>
          <Col md="6">
            <Pagination className="justify-content-end">
              <PaginationItem disabled>
                <PaginationLink previous />
              </PaginationItem>
              {Array.from({ length: 5 }, (_, i) => (
                <PaginationItem active={i === 0} key={i}>
                  <PaginationLink>{i + 1}</PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationLink next />
              </PaginationItem>
            </Pagination>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default VehicleTable;
