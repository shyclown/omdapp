import React, {Component} from 'react';
import TablePagination from "@material-ui/core/TablePagination";
//import {t} from "translations";

/*
* For Backend Pagination only
*/

class Pagination extends Component {

    labelDisplayedRows = ({from, to, count}) => {
        if(this.props.labelDisplayedRows){
            return this.props.labelDisplayedRows({from, to, count})
        }
        else {
            if (+this.props.perPage === +this.props.total) {
                return (this.props.total + ' of ' + this.props.total)
            } else {
                return (from + ' - ' + to + ' of ' + count)
            }
        }
    };
    handleChangePage = (event, page) => {
        this.props.onChangePage && this.props.onChangePage( page );
    };

    handleChangeRowsPerPage = event => {
        this.props.onChangeRowsPerPage && this.props.onChangeRowsPerPage( event.target.value );
    };

    render() {
        const{
            total,
            perPage,
            page,
            rowsPerPageOptions,
            onChangeRowsPerPage,
            onChangePage,
            disableAllOption
        } = this.props;
        return(
            <TablePagination
                style={{ }}
                component="div"
                count={ this.props.total }
                rowsPerPage={ this.props.perPage }
                page={ this.props.page }
                backIconButtonProps={{ 'aria-label': 'default.pagination.previousPage' }}
                nextIconButtonProps={{ 'aria-label': 'default.pagination.nextPage' }}
                onChangePage={ this.handleChangePage }
                rowsPerPageOptions = {
                    rowsPerPageOptions
                        ?
                        (disableAllOption ?
                                [...rowsPerPageOptions] :
                                [...rowsPerPageOptions , 'all']
                        )
                        :
                        (disableAllOption ?
                                [25,50] :
                                [25,50,'all']
                        )
                }
                SelectProps = {{
                    value: perPage,
                    renderValue: (value)=> {
                        const v = value === total ? 'all' : perPage;
                        return <div>{v}</div>
                    },
                    onChange: (event)=>{
                        const v = event.target.value === 'all' ? +total : +event.target.value;
                        onChangeRowsPerPage && onChangeRowsPerPage( v );
                    }
                }}
                onChangeRowsPerPage={ this.handleChangeRowsPerPage }
                labelRowsPerPage={ this.props.labelRowsPerPage || null }
                labelDisplayedRows={
                    this.labelDisplayedRows
                }
            />
        )
    }
}
export default Pagination;