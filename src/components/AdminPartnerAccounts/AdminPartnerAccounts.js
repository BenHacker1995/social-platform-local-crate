import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clearError } from '../../redux/actions/loginActions';
import moment from 'moment';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Nav from '../Nav/Nav';

const mapStateToProps = state => ({
  user: state.user,
  partners: state.partner.partners,
});

class AdminPartnerAccounts extends Component {

  componentDidMount() {
      this.props.dispatch(clearError());
      this.props.dispatch({ type: 'FETCH_PARTNERS' })
  }

  dateConvert = ( date ) => {
    const stringDate = String(date);
    // moment().format(stringDate, ["ll", moment.ISO_8601]);
    return moment().utc( date ).format("MMM Do YYYY");
  }

  render() {
    return (
      <div>
        <Nav />
        <Table>
          <TableHead>
          <TableRow>
            <TableCell>Partner Name</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Date Created</TableCell>
            <TableCell>Date Updated</TableCell>
          </TableRow>
          </TableHead>
            <TableBody>
                {this.props.partners.map( partner => {
                  return (
                    <TableRow key={partner.id}>
                        <TableCell>{partner.name}</TableCell>
                        <TableCell>{partner.location}</TableCell>
                        <TableCell>{partner.first_name}</TableCell>
                        <TableCell>{partner.last_name}</TableCell>
                        <TableCell>{String(this.dateConvert(partner.date_created))}</TableCell>
                        <TableCell>{String(this.dateConvert(partner.date_updated))}</TableCell>
                    </TableRow> 
                  );
                })}
            </TableBody>
        </Table>
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(AdminPartnerAccounts);