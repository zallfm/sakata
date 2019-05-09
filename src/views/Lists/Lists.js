import React, { Component } from "react";
import { Link } from "react-router-dom";
import { push } from 'connected-react-router'
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  Button
} from "reactstrap";

import { connect } from "react-redux";
import { removeBiller } from "../../redux/actions/biller";
import { withRouter } from 'react-router'

class Lists extends Component {
  handleDelete = function(index){
    this.props.removeBiller(index)
  }
  handleEdit = function(index){
    this.props.history.push(`/base/forms/${index}/edit`)
  }
  render() {
    const dataList = this.props.dataBiller ? this.props.dataBiller : '';
    console.log(this.props.dataBiller)
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify" /> Data Users{" "}
              </CardHeader>
              <CardBody>
                { dataList !== '' ?
                  <Table responsive hover>
                    <thead>
                      <tr>
                        <th scope="col">Product Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Status</th>
                        <th scope="col">action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataList.map((data, index) => (
                        <tr key={index}>
                          <td>{data.product_id}</td>
                          <td>{data.name}</td>
                          <td>{data.description}</td>
                          <td>{data.status}</td>
                          <td>
                            <Button
                              type="button"
                              size="sm"
                              color="danger"
                              className="mr-2"
                              onClick={()=>this.handleEdit(index)}>
                              <i className="fa fa-dot-circle-o" /> Edit
                            </Button>
                            <Button
                              type="button"
                              size="sm"
                              color="danger"
                              className="mr-2"
                              onClick={()=>this.handleDelete(index)}>
                              <i className="fa fa-dot-circle-o" /> Delete
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  : "no data"
                }
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  dataBiller: state.biller.dataBiller,
});

const mapDispatchToProps = dispatch => {
  return {
      removeBiller : index => dispatch(removeBiller(index)),
      
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Lists));
