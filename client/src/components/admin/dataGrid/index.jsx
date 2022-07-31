import React,{useState} from 'react'
import { DataGrid, GridColDef, GridApi, GridCellValue } from '@mui/x-data-grid';
import {useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
export default function TableData(props) {
    const navigate = useNavigate();
    const axios = require('axios')
    const rows = props.listData
    const cols = props.cols
    const nameData = props.route.replace('/admin/','')
    const [open, setOpen] = useState(false);
    const [thisRow, setThisRow] = useState([])
    const style = {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 400,
      bgcolor: "background.paper",
      border: "2px solid #000",
      boxShadow: 24,
      p: 4
    };
    const columns: GridColDef[] = [
      { field: 'col1', headerName: cols.col1, width: 200, },
      { field: 'col2', headerName: cols.col2, width: 200 },
      { field: 'col3', headerName: cols.col3, width: 150 },
      { field: 'col4', headerName: cols.col4, width: 150},
      { field: 'col5', headerName: 'Hành động', width: 150,
        sortable: false,
        renderCell: (params) => {
          const onDetail = (e) => {
            e.stopPropagation(); // don't select this row after clicking
    
            const api: GridApi = params.api;
            const thisRow: Record<string, GridCellValue> = {};
            api
              .getAllColumns()
              .filter((c) => c.field !== '__check__' && !!c)
              .forEach(
                (c) => (thisRow[c.field] = params.row[c.field]),
              );
            
            navigate(`${props.route}/${thisRow.id}`)
          };
          const onDelete = (e) => {
            e.stopPropagation(); // don't select this row after clicking
    
            const api: GridApi = params.api;
            const thisRow: Record<string, GridCellValue> = {};
            api
              .getAllColumns()
              .filter((c) => c.field !== '__check__' && !!c)
              .forEach(
                (c) => (thisRow[c.field] = params.row[c.field]),
              );
            handleOpen({
              nameData: nameData,
              rowId: thisRow.id
            })      
          }
          return <>
                    <Button color="secondary" onClick={onDetail}>Chi tiết</Button>
                    <Button color="error" onClick={onDelete}>Xóa</Button>
                    <Modal
                      open={open}
                      onClose={handleCloseDelete}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style}>
                        <Typography id="modal-modal-description" sx={{ mt: 1 }}>
                          Mục bị xóa sẽ không thể khôi phục. Bạn chắc chắn muốn xóa?
                        </Typography>
                        <Button variant="text" size="small" onClick={handleCloseDelete}>Đóng</Button>
                        <Button variant="contained" className='float-right' color="error" size="small" onClick={handleDelete}>Xóa vĩnh viễn</Button>
                      </Box>
                    </Modal>
                  </>
        },
     },
     { field: 'id', headerName: cols.id, width: 150}
    ];
    const handleCloseDelete = () => setOpen(false);
    const handleOpen = (value) => {
      setThisRow(value)
      setOpen(true)
    };
    const handleDelete = () => {
      axios.delete(`${process.env.REACT_APP_API_URL}/admin/${thisRow.nameData}/${thisRow.rowId}/delete`)
        .then(()=>{
          window.location.href = `${process.env.REACT_APP_CLIENT_URL}/admin/${thisRow.nameData}`
        })
        .catch(err => console.log(err))
    }
  return (
    <>
    <h3 className='h3-gold'>{props.nameTable}</h3>
    <div style={{ height: 300, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} />
    </div>
    </>
  )
}
