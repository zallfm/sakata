import React, { Component } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Collapse,
  Fade,
  Form,
  FormGroup,
  Input,
  Label,
  Row
} from "reactstrap";

class Forms extends Component {
  state = {
    isToggleOn: [],
    collapse: [],
    fadeIn: true,
    timeout: 300,
    biller: {
      product_id: "",
      name: "",
      description: "",
      steps: [
        {
          name: "",
          description: "",
          request_body_type: "",
          response_body_type: "",
          steps: [
            {
              name: "",
              description: "",
              request_body_type: "",
              response_body_type: "",
              request_type: "",
              url: "",
              method: "POST",
              data: [
                {
                  source_data: "",
                  target_data: "",
                  target_name: "",
                  target_step: [],
                  key: "",
                  pre_value: "",
                  post_value: ""
                }
              ]
            }
          ],
          data: [
            {
              source_data: "",
              target_data: "",
              target_name: "",
              target_step: [],
              key: "",
              pre_value: "",
              post_value: ""
            }
          ]
        }
      ],
      status: false,
      additional_data: [
        [
         "", ""
        ]
      ]
    }
  };

  onToggle = idx => {
    this.setState(collapse => {
      const steps = [...collapse.steps];
      return { steps };
    });
  };

  toggleStepIn = idx => {
    this.setState({ collapse: !this.state.collapse });
  };

  toggleStepInData = idx => {
    this.setState({ collapse: !this.state.collapse });
  };

  // handle input Biller
  handleChangeBiller = (event, target) => {

        this.setState({
          biller: {
            ...this.state.biller,
            [target]: event.currentTarget.value
          }
        })
    };

  // handle input StepIn
  handleChangeStepIn = (stepInIdx, event, target) => {
    console.log(this.state.biller.steps)
    this.setState({
      biller: {
        ...this.state.biller,
        steps: [
          ...this.state.biller.steps.slice(0, stepInIdx),
          {
            ...this.state.biller.steps[stepInIdx],
            [target]: event.currentTarget.value
          },
          ...this.state.biller.steps.slice(stepInIdx + 1)
        ]
      }
    })
  };

  // handle input StepInData
  handleChangeStepInData = (stepInIdx, stepInDataIdx, event, target) => {
    this.setState({
      biller: {
        ...this.state.biller,
        steps: [
          ...this.state.biller.steps.slice(0, stepInIdx),
          {
            ...this.state.biller.steps[stepInIdx],
            data: [
              ...this.state.biller.steps[stepInIdx].data.slice(0, stepInDataIdx),
              {
                ...this.state.biller.steps[stepInIdx].data[stepInDataIdx],
                [target]: event.currentTarget.value
              },
              ...this.state.biller.steps[stepInIdx].data.slice(stepInDataIdx + 1)
            ]
          },
          ...this.state.biller.steps.slice(stepInIdx + 1)
        ]
      }
    })
  };

  // handle input StepOut
  handleChangeStepOut = (stepInIdx, stepOutIdx, event, target) => {
    this.setState({
      biller: {
        ...this.state.biller,
        steps: [
          ...this.state.biller.steps.slice(0, stepInIdx),
          {
            ...this.state.biller.steps[stepInIdx],
            data: this.state.biller.steps[stepInIdx].data,
            steps: [
              ...this.state.biller.steps[stepInIdx].steps.slice(0, stepOutIdx),
              {
                ...this.state.biller.steps[stepInIdx].steps[stepOutIdx],
                [target]: event.currentTarget.value
              },
              ...this.state.biller.steps[stepInIdx].steps.slice(stepOutIdx + 1)
            ]
          },
          ...this.state.biller.steps.slice(stepInIdx + 1)
        ]
      }
    })
  };

  // handle input StepOut Data
  handleChangeStepOutData = (stepInIdx, stepOutIdx, stepOutDataIdx, event, target) => {
    this.setState({
      biller: {
        ...this.state.biller,
        steps: [
          ...this.state.biller.steps.slice(0, stepInIdx),
          {
            ...this.state.biller.steps[stepInIdx],
            steps: [
              ...this.state.biller.steps[stepInIdx].steps.slice(0, stepOutIdx),
              {
                ...this.state.biller.steps[stepInIdx].steps[stepOutIdx],
                data: [
                  ...this.state.biller.steps[stepInIdx].steps[stepOutIdx].data.slice(0, stepOutDataIdx),
                  {
                    ...this.state.biller.steps[stepInIdx].steps[stepOutIdx].data[stepOutDataIdx],
                    [target]: event.currentTarget.value
                  },
                  ...this.state.biller.steps[stepInIdx].steps[stepOutIdx].data.slice(stepOutDataIdx + 1)
                ]
              },
              ...this.state.biller.steps[stepInIdx].steps.slice(stepOutIdx + 1)
            ]
          },
          ...this.state.biller.steps.slice(stepInIdx + 1)
        ]
      }
    })
    console.log(this.state.biller.steps[stepInIdx].steps[stepOutIdx])
  };

  // handle input addForm
  handleChangeaddForm = (additionalDataIdx, event, target) => {
    const new_additional_data = target === "additional_data_key" ?
      [event.currentTarget.value, this.state.biller.additional_data[additionalDataIdx][1]] :
      [this.state.biller.additional_data[additionalDataIdx][0], event.currentTarget.value]
    this.setState({
      biller: {
        ...this.state.biller,
        additional_data: [
          ...this.state.biller.additional_data.slice(0, additionalDataIdx),
          new_additional_data,
          ...this.state.biller.additional_data.slice(additionalDataIdx + 1)
        ]
      }
    })
  };

  // Add Stepin Input Form
  addStepIn = e => {
    this.setState({isToggleOn:true});
    this.setState({
      biller: {
        ...this.state.biller,
        steps: [
          ...this.state.biller.steps,
          {
            name: "",
            description: "",
            request_body_type: "",
            response_body_type: "",
            steps: [
              {
                data: []
              }
            ],
            data: []
          }
        ]
      }
    });
  };

  // Add StepIn Data Form
  addStepInData = stepInIdx => {
    this.setState({
      biller: {
        ...this.state.biller,
        steps: [
          ...this.state.biller.steps.slice(0, stepInIdx),
          {
            ...this.state.biller.steps[stepInIdx],
            data: [
              ...this.state.biller.steps[stepInIdx].data,
              {
                source_data: "",
                target_data: "",
                target_name: "",
                target_step: [],
                key: "",
                pre_value: "",
                post_value: ""
              }
            ]
          },
          ...this.state.biller.steps.slice(stepInIdx + 1)
        ]
      }
    });
  };

  // Add StepOut Form
  addStepOut = stepInIdx => {
    this.setState({
      biller: {
        ...this.state.biller,
        steps: [
          ...this.state.biller.steps.slice(0, stepInIdx),
          {
            ...this.state.biller.steps[stepInIdx],
            data: [...this.state.biller.steps[stepInIdx].data],
            steps: [
              ...this.state.biller.steps[stepInIdx].steps,
              {
                name: "",
                description: "",
                request_body_type: "",
                response_body_type: "",
                request_type: "",
                url: "",
                method: "POST",
                data: []
              }
            ]
          },
          ...this.state.biller.steps.slice(stepInIdx + 1)
        ]
      }
    });
  };

  // Add StepOut Data Form
  addStepOutData = (stepInIdx, stepOutIdx)  => {
    this.setState({
      biller: {
        ...this.state.biller,
        steps: [
          ...this.state.biller.steps.slice(0, stepInIdx),
          {
            ...this.state.biller.steps[stepInIdx],
            steps: [
              ...this.state.biller.steps[stepInIdx].steps.slice(0, stepOutIdx),
              {
                ...this.state.biller.steps[stepInIdx].steps[stepOutIdx],
                data: [
                  ...this.state.biller.steps[stepInIdx].steps[stepOutIdx].data,
                  {
                    source_data: "",
                    target_data: "",
                    target_name: "",
                    target_step: [],
                    key: "",
                    pre_value: "",
                    post_value: ""
                  }
                ]
              },
              ...this.state.biller.steps[stepInIdx].steps.slice(stepOutIdx + 1),
            ]
          },
          ...this.state.biller.steps.slice(stepInIdx + 1)
        ]
      }
    });
  }

  // AddForm for additional form
  addForm = () => {
    this.setState({
      biller: {
        ...this.state.biller,
        additional_data: [
          ...this.state.biller.additional_data, ["", ""]
        ]
      }
    })
  }

  // Delete action stepin
  onDeleteStepIn = idx => {
    this.setState({
      biller: {
        ...this.state.biller,
        steps: this.state.biller.steps.filter(
          (steps, stepIdx) => idx !== stepIdx
        )
      }
    });
  };

  // Delete action Stepin Data
  onDeleteStepInData = (stepInIdx, stepInDataIdx) => {
    this.setState({
      biller: {
        ...this.state.biller,
        steps: [
          ...this.state.biller.steps.slice(0, stepInIdx),
          {
            ...this.state.biller.steps[stepInIdx],
            data: [
              ...this.state.biller.steps[stepInIdx].data.filter(
                (steps, currentStepInDataIdx) => stepInDataIdx !== currentStepInDataIdx
              )
            ]
          },
          ...this.state.biller.steps.slice(stepInIdx + 1)
        ]
      }
    });
  };

  // Delete action Stepout
  onDeleteStepOut = (stepInIdx, stepOutIdx) => {
    this.setState({
      biller: {
        ...this.state.biller,
        steps: [
          ...this.state.biller.steps.slice(0, stepInIdx),
          {
            ...this.state.biller.steps[stepInIdx],
            steps: this.state.biller.steps[stepInIdx].steps.filter(
                (steps, currentStepOutIdx) => stepOutIdx !== currentStepOutIdx
              )
          },
          ...this.state.biller.steps.slice(stepInIdx + 1)
        ]
      }
    });
  };

  // Delete action Stepout Data
  onDeleteStepOutData = (stepInIdx, stepOutIdx, stepOutDataIdx) => {
    this.setState({
      biller: {
        ...this.state.biller,
        steps: [
          ...this.state.biller.steps.slice(0, stepInIdx),
          {
            ...this.state.biller.steps[stepInIdx],
            steps: [
              ...this.state.biller.steps[stepInIdx].steps.slice(0, stepOutIdx),
              {
                ...this.state.biller.steps[stepInIdx].steps[stepOutIdx],
                data: [
                  ...this.state.biller.steps[stepInIdx].steps[stepOutIdx].data.filter(
                    (steps, currentStepOutDataIdx) => stepOutDataIdx !== currentStepOutDataIdx
                  )
                ]
              },
              ...this.state.biller.steps[stepInIdx].steps.slice(stepOutIdx + 1),

            ]
          },
          ...this.state.biller.steps.slice(stepInIdx + 1)
        ]
      }
    });
  };

  // Delete action addForm
  onDeleteaddForm = (additionalDataIdx) => {
    console.log(additionalDataIdx)
    this.setState({
      biller: {
        ...this.state.biller,
        additional_data: this.state.biller.additional_data.filter(
          (form, currentAdditionalDataIdx) => additionalDataIdx !== currentAdditionalDataIdx)
      }
    });
  };

  handleSubmitBiller = e => {
    console.log(this.state.biller)
    e.preventDefault();
    const newObject = this.state.biller.additional_data.reduce((prev,curr) => {
          prev[curr[0]]=curr[1];
          return prev;
        },{})
    console.log(newObject)
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md="12">
            <Card>
              <CardHeader>
                <strong>Biller </strong>
                <small> Form</small>
              </CardHeader>
              <CardBody>
                <Form
                  onSubmit={this.handleSubmitBiller}
                  // onChange={this.handleChange}
                  action=""
                  method="post"
                  encType="multipart/form-data"
                  className="form-horizontal"
                >
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="product_id">Product Id</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="text"
                        id="product_id"
                        name="product_id"
                        autoFocus
                        required
                        placeholder="99QwE@!1qwqwe7W2324-74524"
                        value={this.state.biller.product_id}
                        onChange={(event) => this.handleChangeBiller(event, "product_id")}

                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="name">Name</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Enter Name"
                        value={this.state.biller.name}
                        onChange={(event) => this.handleChangeBiller(event, "name")}

                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="description">Description</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="textarea"
                        name="description"
                        id="description"
                        rows="9"
                        placeholder="Decription..."
                        value={this.state.biller.description}
                        onChange={(event) => this.handleChangeBiller(event, "description")}

                      />
                    </Col>
                  </FormGroup>
                  <Button onClick={this.addStepIn} color="primary">
                    <i className="fa fa-plus" />
                    &nbsp;Add StepIn
                  </Button>
                  <br />
                  <br />

                    {this.state.isToggleOn === true ? (
                      <Row>
                        <Col xs="12">
                          <Fade timeout={this.state.timeout} in={this.state.fadeIn}>
                            {this.state.biller.steps.map((stepIn, stepInIdx) => {
                              const nameId = `name-${stepInIdx}`,
                                descriptionId = `description-${stepInIdx}`,
                                request_body_typeId = `request_body_type-${stepInIdx}`,
                                response_body_typeId = `response_body_type-${stepInIdx}`;
                              return (
                                <Card>
                                  <CardHeader>
                                    <strong
                                      htmlFor={this.state.biller.steps}
                                    >{`StepIn ${stepInIdx + 1} `}</strong>
                                    <small> Form</small>
                                    <div className="card-header-actions">
                                      <Button
                                        color="link"
                                        className="card-header-action btn-minimize"
                                        data-target="#collapseExample"
                                        onClick={() => this.toggleStepIn(stepInIdx)}
                                      >
                                        <i className="icon-arrow-up" />
                                      </Button>
                                      <Button
                                        color="link"
                                        className="card-header-action btn-close"
                                        onClick={() =>
                                          this.onDeleteStepIn(stepInIdx)
                                        }
                                      >
                                        <i className="icon-close" />
                                      </Button>
                                    </div>
                                  </CardHeader>
                                  <Collapse
                                    isOpen={this.state.collapse}
                                    id="collapseExample"
                                  >
                                    <CardBody>
                                      <Form
                                        onSubmit={this.handleSubmitStepin}
                                        className="form-horizontal"
                                      >
                                        <FormGroup row>
                                          <Col md="3">
                                            <Label htmlFor={nameId}>Name</Label>
                                          </Col>
                                          <Col xs="12" md="9">
                                            <Input
                                              type="text"
                                              id={nameId}
                                              name={nameId}
                                              data-id={stepInIdx}
                                              value={this.state.biller.steps[stepInIdx].name}
                                              onChange={(event) => this.handleChangeStepIn(stepInIdx, event, "name")}
                                              className="name"
                                              placeholder="Enter Name"
                                            />
                                          </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                          <Col md="3">
                                            <Label htmlFor={descriptionId}>
                                              Description
                                            </Label>
                                          </Col>
                                          <Col xs="12" md="9">
                                            <Input
                                              type="textarea"
                                              rows="9"
                                              name={descriptionId}
                                              data-id={stepInIdx}
                                              id={descriptionId}
                                              value={this.state.biller.steps[stepInIdx].description}
                                              onChange={(event) => this.handleChangeStepIn(stepInIdx, event, "description")}
                                              className="description"
                                              placeholder="Decription..."
                                            />
                                          </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                          <Col md="3">
                                            <Label>Request Body Type</Label>
                                          </Col>
                                          <Col md="9">
                                            <FormGroup check inline>
                                              <Input
                                                className="form-check-input"
                                                type="radio"
                                                id="json"
                                                name={request_body_typeId}
                                                value="json"
                                                checked={this.state.biller.steps[stepInIdx].request_body_type === 'json'}
                                                onChange={(event) => this.handleChangeStepIn(stepInIdx, event, "request_body_type")}
                                              />
                                              <Label
                                                className="form-check-label"
                                                check
                                                htmlFor="request_body_type"
                                              >
                                                Json
                                              </Label>
                                            </FormGroup>
                                            <FormGroup check inline>
                                              <Input
                                                className="form-check-input"
                                                type="radio"
                                                id="xml"
                                                name={request_body_typeId}
                                                value="xml"
                                                checked={this.state.biller.steps[stepInIdx].request_body_type === 'xml'}
                                                onChange={(event) => this.handleChangeStepIn(stepInIdx, event, "request_body_type")}
                                              />
                                              <Label
                                                className="form-check-label"
                                                check
                                                htmlFor="request_body_type"
                                              >
                                                Xml
                                              </Label>
                                            </FormGroup>
                                          </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                          <Col md="3">
                                            <Label>Response Body Type</Label>
                                          </Col>
                                          <Col md="9">
                                            <FormGroup check inline>
                                              <Input
                                                className="form-check-input"
                                                type="radio"
                                                id="json"
                                                name={response_body_typeId}
                                                value="json"
                                                checked={this.state.biller.steps[stepInIdx].response_body_type === 'json'}
                                                onChange={(event) => this.handleChangeStepIn(stepInIdx, event, "response_body_type")}

                                              />
                                              <Label
                                                className="form-check-label"
                                                check
                                                htmlFor="response_body_type"
                                              >
                                                Json
                                              </Label>
                                            </FormGroup>
                                            <FormGroup check inline>
                                              <Input
                                                className="form-check-input"
                                                type="radio"
                                                id="xml"
                                                name={response_body_typeId}
                                                value="xml"
                                                checked={this.state.biller.steps[stepInIdx].response_body_type === 'xml'}
                                                onChange={(event) => this.handleChangeStepIn(stepInIdx, event, "response_body_type")}

                                              />
                                              <Label
                                                className="form-check-label"
                                                check
                                                htmlFor="response_body_type"
                                              >
                                                Xml
                                              </Label>
                                            </FormGroup>
                                          </Col>
                                        </FormGroup>
                                        <Button
                                          color="primary mr-2"
                                          onClick={() =>
                                            this.addStepOut(stepInIdx)
                                          }
                                        >
                                          <i className="fa fa-plus" />
                                          &nbsp;Add StepOut
                                        </Button>
                                        <Button
                                          onClick={() =>
                                            this.addStepInData(stepInIdx)
                                          }
                                          color="primary"
                                        >
                                          <i className="fa fa-plus" />
                                          &nbsp;Add StepIn Data
                                        </Button>
                                        <br />
                                        <br />
                                        {/* end form StepIn Add */}

                                        {/* Table form Stepin Data */}
                                        <Row>
                                          <Col xs="12">
                                            <Fade
                                              timeout={this.state.timeout}
                                              in={this.state.fadeIn}
                                            >
                                              {stepIn.data.map(
                                                (stepsdata, stepInDataIdx) => {
                                                  const source_dataId = `source_data-${stepInDataIdx}`,
                                                    target_dataId = `target_data-${stepInDataIdx}`,
                                                    target_nameId = `target_name-${stepInDataIdx}`,
                                                    target_stepId = `target_step-${stepInDataIdx}`,
                                                    keyId = `key-${stepInDataIdx}`,
                                                    pre_valueId = `pre_value-${stepInDataIdx}`,
                                                    post_valueId = `post_value-${stepInDataIdx}`;
                                                  return (
                                                    <Card>
                                                      <CardHeader>
                                                        <strong
                                                          htmlFor={stepIn.data}
                                                        >{`StepIn Data ${stepInIdx +
                                                        1}`}</strong>
                                                        <small>{` Form ${stepInDataIdx +
                                                        1}`}</small>
                                                        <div className="card-header-actions">
                                                          <Button
                                                            color="link"
                                                            className="card-header-action btn-minimize"
                                                            data-target="#collapseExample"
                                                            onClick={() =>
                                                              this.toggleStepInData(
                                                                stepInDataIdx
                                                              )
                                                            }
                                                          >
                                                            <i className="icon-arrow-up" />
                                                          </Button>
                                                          <Button
                                                            color="link"
                                                            className="card-header-action btn-close"
                                                            onClick={() =>
                                                              this.onDeleteStepInData(
                                                                stepInIdx, stepInDataIdx
                                                              )
                                                            }
                                                          >
                                                            <i className="icon-close" />
                                                          </Button>
                                                        </div>
                                                      </CardHeader>
                                                      <Collapse
                                                        isOpen={this.state.collapse}
                                                        id="collapseExample"
                                                      >
                                                        <CardBody>
                                                          <Form className="form-horizontal">
                                                            <FormGroup row>
                                                              <Col md="3">
                                                                <Label htmlFor="source_data">
                                                                  Source Data
                                                                </Label>
                                                              </Col>
                                                              <Col xs="12" md="9">
                                                                <Input
                                                                  type="text"
                                                                  name={
                                                                    source_dataId
                                                                  }
                                                                  data-id={
                                                                    stepInDataIdx
                                                                  }
                                                                  id={source_dataId}
                                                                  value={stepIn.data[stepInDataIdx].source_data}
                                                                  onChange={(event) => this.handleChangeStepInData(stepInIdx, stepInDataIdx, event, "source_data")}
                                                                  placeholder="Enter Source Data"
                                                                />
                                                              </Col>
                                                            </FormGroup>
                                                            <FormGroup row>
                                                              <Col md="3">
                                                                <Label htmlFor="target_data">
                                                                  Target Data
                                                                </Label>
                                                              </Col>
                                                              <Col xs="12" md="9">
                                                                <Input
                                                                  type="text"
                                                                  name={
                                                                    target_dataId
                                                                  }
                                                                  data-id={
                                                                    stepInDataIdx
                                                                  }
                                                                  id={target_dataId}
                                                                  value={stepIn.data[stepInDataIdx].target_data}
                                                                  onChange={(event) => this.handleChangeStepInData(stepInIdx, stepInDataIdx, event, "target_data")}
                                                                  placeholder="Enter Target Data"
                                                                />
                                                              </Col>
                                                            </FormGroup>
                                                            <FormGroup row>
                                                              <Col md="3">
                                                                <Label htmlFor="target_name">
                                                                  Target Name
                                                                </Label>
                                                              </Col>
                                                              <Col xs="12" md="9">
                                                                <Input
                                                                  type="text"
                                                                  name={
                                                                    target_nameId
                                                                  }
                                                                  data-id={
                                                                    stepInDataIdx
                                                                  }
                                                                  id={target_nameId}
                                                                  value={stepIn.data[stepInDataIdx].target_name}
                                                                  onChange={(event) => this.handleChangeStepInData(stepInIdx, stepInDataIdx, event, "target_name")}
                                                                  placeholder="Enter Target Name"
                                                                />
                                                              </Col>
                                                            </FormGroup>
                                                            <FormGroup row>
                                                              <Col md="3">
                                                                <Label htmlFor="target_step">
                                                                  Target Step
                                                                </Label>
                                                              </Col>
                                                              <Col xs="12" md="9">
                                                                <Input
                                                                  type="text"
                                                                  name={
                                                                    target_stepId
                                                                  }
                                                                  data-id={
                                                                    stepInDataIdx
                                                                  }
                                                                  id={target_stepId}
                                                                  value={stepIn.data[stepInDataIdx].target_step}
                                                                  onChange={(event) => this.handleChangeStepInData(stepInIdx,stepInDataIdx, event, "target_step")}
                                                                  placeholder="Enter Target Step"
                                                                />
                                                              </Col>
                                                            </FormGroup>
                                                            <FormGroup row>
                                                              <Col md="3">
                                                                <Label htmlFor="key">
                                                                  Key
                                                                </Label>
                                                              </Col>
                                                              <Col xs="12" md="9">
                                                                <Input
                                                                  type="text"
                                                                  name={keyId}
                                                                  data-id={
                                                                    stepInDataIdx
                                                                  }
                                                                  id={keyId}
                                                                  value={stepIn.data[stepInDataIdx].key}
                                                                  onChange={(event) => this.handleChangeStepInData(stepInIdx, stepInDataIdx, event, "key")}
                                                                  placeholder="Enter Key"
                                                                />
                                                              </Col>
                                                            </FormGroup>
                                                            <FormGroup row>
                                                              <Col md="3">
                                                                <Label htmlFor="pre_value">
                                                                  Pre Value
                                                                </Label>
                                                              </Col>
                                                              <Col xs="12" md="9">
                                                                <Input
                                                                  type="text"
                                                                  name={pre_valueId}
                                                                  data-id={
                                                                    stepInDataIdx
                                                                  }
                                                                  id={pre_valueId}
                                                                  value={stepIn.data[stepInDataIdx].pre_value}
                                                                  onChange={(event) => this.handleChangeStepInData(stepInIdx, stepInDataIdx, event, "pre_value")}
                                                                  placeholder="Enter Pre Value"
                                                                />
                                                              </Col>
                                                            </FormGroup>
                                                            <FormGroup row>
                                                              <Col md="3">
                                                                <Label htmlFor="post_value">
                                                                  Post Value
                                                                </Label>
                                                              </Col>
                                                              <Col xs="12" md="9">
                                                                <Input
                                                                  type="text"
                                                                  name={
                                                                    post_valueId
                                                                  }
                                                                  data-id={
                                                                    stepInDataIdx
                                                                  }
                                                                  id={post_valueId}
                                                                  value={stepIn.data[stepInDataIdx].post_value}
                                                                  onChange={(event) => this.handleChangeStepInData(stepInIdx, stepInDataIdx, event, "post_value")}
                                                                  placeholder="Enter Post Value"
                                                                />
                                                              </Col>
                                                            </FormGroup>
                                                          </Form>
                                                        </CardBody>
                                                      </Collapse>
                                                    </Card>
                                                  );
                                                }
                                              )}
                                            </Fade>
                                          </Col>
                                        </Row>
                                        {/* End Form StepIn Data */}

                                        {/* Form StepOut */}
                                        <Row>
                                          <Col xs="12">
                                            <Fade
                                              timeout={this.state.timeout}
                                              in={this.state.fadeIn}
                                            >
                                              {stepIn.steps.map(
                                                (stepOut, stepOutIdx) => {
                                                  const nameId = `name-${stepOutIdx}`,
                                                    descriptionId = `description-${stepOutIdx}`,
                                                    request_body_typeId = `request_body_type-${stepOutIdx}`,
                                                    response_body_typeId = `response_body_type-${stepOutIdx}`,
                                                    request_typeId = `request_type-${stepOutIdx}`,
                                                    urlId = `url-${stepOutIdx}`,
                                                    methodId = `method-${stepOutIdx}`;
                                                  return (
                                                    <Card>
                                                      <CardHeader>
                                                        <strong>{`StepOut ${stepOutIdx +
                                                        1} `}</strong>
                                                        <div className="card-header-actions">
                                                          <Button
                                                            color="link"
                                                            className="card-header-action btn-minimize"
                                                            data-target="#collapseExample"
                                                            onClick={this.toggle}
                                                          >
                                                            <i className="icon-arrow-up" />
                                                          </Button>
                                                          <Button
                                                            color="link"
                                                            className="card-header-action btn-close"
                                                            onClick={() =>
                                                              this.onDeleteStepOut(
                                                                stepInIdx, stepOutIdx
                                                              )
                                                            }
                                                          >
                                                            <i className="icon-close" />
                                                          </Button>
                                                        </div>
                                                      </CardHeader>
                                                      <Collapse
                                                        isOpen={this.state.collapse}
                                                        id="collapseExample"
                                                      >
                                                        <CardBody>
                                                          <Form className="form-horizontal">
                                                            <FormGroup row>
                                                              <Col md="3">
                                                                <Label htmlFor="name">
                                                                  Name
                                                                </Label>
                                                              </Col>
                                                              <Col xs="12" md="9">
                                                                <Input
                                                                  type="text"
                                                                  id="name"
                                                                  name={nameId}
                                                                  value={stepIn.steps[stepOutIdx].name}
                                                                  onChange={(event) => this.handleChangeStepOut(stepInIdx, stepOutIdx, event, "name")}
                                                                  placeholder="Enter Name"
                                                                />
                                                              </Col>
                                                            </FormGroup>
                                                            <FormGroup row>
                                                              <Col md="3">
                                                                <Label htmlFor="description">
                                                                  Description
                                                                </Label>
                                                              </Col>
                                                              <Col xs="12" md="9">
                                                                <Input
                                                                  type="textarea"
                                                                  name={
                                                                    descriptionId
                                                                  }
                                                                  id="description"
                                                                  rows="9"
                                                                  value={stepIn.steps[stepOutIdx].description}
                                                                  onChange={(event) => this.handleChangeStepOut(stepInIdx, stepOutIdx, event, "description")}
                                                                  placeholder="Decription..."
                                                                />
                                                              </Col>
                                                            </FormGroup>
                                                            <FormGroup row>
                                                              <Col md="3">
                                                                <Label>
                                                                  Request Body Type
                                                                </Label>
                                                              </Col>
                                                              <Col md="9">
                                                                <FormGroup
                                                                  check
                                                                  inline
                                                                >
                                                                  <Input
                                                                    className="form-check-input"
                                                                    type="radio"
                                                                    id="json"
                                                                    name={
                                                                      request_body_typeId
                                                                    }
                                                                    value="json"
                                                                    checked={stepIn.steps[stepOutIdx].request_body_type === 'json'}
                                                                    onChange={(event) => this.handleChangeStepOut(stepInIdx, stepOutIdx, event, "request_body_type")}
                                                                  />
                                                                  <Label
                                                                    className="form-check-label"
                                                                    check
                                                                    htmlFor="request_body_type"
                                                                  >
                                                                    Json
                                                                  </Label>
                                                                </FormGroup>
                                                                <FormGroup
                                                                  check
                                                                  inline
                                                                >
                                                                  <Input
                                                                    className="form-check-input"
                                                                    type="radio"
                                                                    id="xml"
                                                                    name={
                                                                      request_body_typeId
                                                                    }
                                                                    value="xml"
                                                                    checked={stepIn.steps[stepOutIdx].request_body_type === 'xml'}
                                                                    onChange={(event) => this.handleChangeStepOut(stepInIdx, stepOutIdx, event, "request_body_type")}
                                                                  />
                                                                  <Label
                                                                    className="form-check-label"
                                                                    check
                                                                    htmlFor="request_body_type"
                                                                  >
                                                                    Xml
                                                                  </Label>
                                                                </FormGroup>
                                                              </Col>
                                                            </FormGroup>
                                                            <FormGroup row>
                                                              <Col md="3">
                                                                <Label>
                                                                  Request Type
                                                                </Label>
                                                              </Col>
                                                              <Col md="9">
                                                                <FormGroup
                                                                  check
                                                                  inline
                                                                >
                                                                  <Input
                                                                    className="form-check-input"
                                                                    type="radio"
                                                                    id="Web"
                                                                    name={
                                                                      request_typeId
                                                                    }
                                                                    value="web"
                                                                    checked={stepIn.steps[stepOutIdx].request_type === 'web'}
                                                                    onChange={(event) => this.handleChangeStepOut(stepInIdx, stepOutIdx, event, "request_type")}
                                                                  />
                                                                  <Label
                                                                    className="form-check-label"
                                                                    check
                                                                    htmlFor="request_type"
                                                                  >
                                                                    Web
                                                                  </Label>
                                                                </FormGroup>
                                                                <FormGroup
                                                                  check
                                                                  inline
                                                                >
                                                                  <Input
                                                                    className="form-check-input"
                                                                    type="radio"
                                                                    id="func"
                                                                    name={
                                                                      request_typeId
                                                                    }
                                                                    value="func"
                                                                    checked={stepIn.steps[stepOutIdx].request_type === 'func'}
                                                                    onChange={(event) => this.handleChangeStepOut(stepInIdx, stepOutIdx, event, "request_type")}
                                                                  />
                                                                  <Label
                                                                    className="form-check-label"
                                                                    check
                                                                    htmlFor="request_type"
                                                                  >
                                                                    Func
                                                                  </Label>
                                                                </FormGroup>
                                                              </Col>
                                                            </FormGroup>
                                                            <FormGroup row>
                                                              <Col md="3">
                                                                <Label>
                                                                  Response Body Type
                                                                </Label>
                                                              </Col>
                                                              <Col md="9">
                                                                <FormGroup
                                                                  check
                                                                  inline
                                                                >
                                                                  <Input
                                                                    className="form-check-input"
                                                                    type="radio"
                                                                    id="json"
                                                                    name={
                                                                      response_body_typeId
                                                                    }
                                                                    value="json"
                                                                    checked={stepIn.steps[stepOutIdx].response_body_type === 'json'}
                                                                    onChange={(event) => this.handleChangeStepOut(stepInIdx, stepOutIdx, event, "response_body_type")}
                                                                  />
                                                                  <Label
                                                                    className="form-check-label"
                                                                    check
                                                                    htmlFor="request_type"
                                                                  >
                                                                    Json
                                                                  </Label>
                                                                </FormGroup>
                                                                <FormGroup
                                                                  check
                                                                  inline
                                                                >
                                                                  <Input
                                                                    className="form-check-input"
                                                                    type="radio"
                                                                    id="xml"
                                                                    name={
                                                                      response_body_typeId
                                                                    }
                                                                    value="xml"
                                                                    checked={stepIn.steps[stepOutIdx].response_body_type === 'xml'}
                                                                    onChange={(event) => this.handleChangeStepOut(stepInIdx, stepOutIdx, event, "response_body_type")}
                                                                  />
                                                                  <Label
                                                                    className="form-check-label"
                                                                    check
                                                                    htmlFor="request_type"
                                                                  >
                                                                    Xml
                                                                  </Label>
                                                                </FormGroup>
                                                              </Col>
                                                            </FormGroup>
                                                            <FormGroup row>
                                                              <Col md="3">
                                                                <Label htmlFor="url">
                                                                  Url
                                                                </Label>
                                                              </Col>
                                                              <Col xs="12" md="9">
                                                                <Input
                                                                  type="text"
                                                                  id="url"
                                                                  name={urlId}
                                                                  value={stepIn.steps[stepOutIdx].url}
                                                                  onChange={(event) => this.handleChangeStepOut(stepInIdx,stepOutIdx, event, "url")}
                                                                  placeholder="Enter Url"
                                                                />
                                                              </Col>
                                                            </FormGroup>
                                                            <FormGroup row>
                                                              <Col md="3">
                                                                <Label htmlFor="url">
                                                                  Method
                                                                </Label>
                                                              </Col>
                                                              <Col xs="12" md="9">
                                                                <Input
                                                                  type="text"
                                                                  id="POST"
                                                                  name={methodId}
                                                                  placeholder="'POST'"
                                                                  disabled
                                                                />
                                                              </Col>
                                                            </FormGroup>
                                                            <Button
                                                              color="primary"
                                                              onClick={() =>
                                                                this.addStepOutData(stepInIdx, stepOutIdx)
                                                              }
                                                            >
                                                              <i className="fa fa-plus" />
                                                              &nbsp;Add StepsOut Data
                                                            </Button>
                                                            <br /> <br />


                                                            {/*Table Form StepsOut Data*/}
                                                            <Row>
                                                              <Col xs="12">
                                                                <Fade
                                                                  timeout={
                                                                    this.state
                                                                      .timeout
                                                                  }
                                                                  in={
                                                                    this.state
                                                                      .fadeIn
                                                                  }
                                                                >
                                                                  <Row>
                                                                    <Col xs="12">
                                                                      <Fade
                                                                        timeout={
                                                                          this.state
                                                                            .timeout
                                                                        }
                                                                        in={
                                                                          this.state
                                                                            .fadeIn
                                                                        }
                                                                      >
                                                                        {stepOut.data.map(
                                                                          (
                                                                            stepOutdata,
                                                                            stepOutDataIdx
                                                                          ) => {
                                                                            const source_dataId = `source_data-${stepOutDataIdx}`,
                                                                              target_dataId = `target_data-${stepOutDataIdx}`,
                                                                              target_nameId = `target_name-${stepOutDataIdx}`,
                                                                              target_stepId = `target_step-${stepOutDataIdx}`,
                                                                              keyId = `key-${stepOutDataIdx}`,
                                                                              pre_valueId = `pre_value-${stepOutDataIdx}`,
                                                                              post_valueId = `post_value-${stepOutDataIdx}`;
                                                                            return (
                                                                              <Card>
                                                                                <CardHeader>
                                                                                  <strong
                                                                                    htmlFor={
                                                                                      this
                                                                                        .state
                                                                                        .steps
                                                                                    }
                                                                                  >{`StepsOut Data ${stepInIdx +
                                                                                  1} `}</strong>
                                                                                  <small>
                                                                                    {`Form ${stepOutDataIdx +
                                                                                    1}`}
                                                                                  </small>
                                                                                  <div className="card-header-actions">
                                                                                    <Button
                                                                                      color="link"
                                                                                      className="card-header-action btn-minimize"
                                                                                      data-target="#collapseExample"
                                                                                      onClick={
                                                                                        this
                                                                                          .toggle
                                                                                      }
                                                                                    >
                                                                                      <i className="icon-arrow-up" />
                                                                                    </Button>
                                                                                    <Button
                                                                                      color="link"
                                                                                      className="card-header-action btn-close"
                                                                                      onClick={() =>
                                                                                        this.onDeleteStepOutData(stepInIdx, stepOutIdx, stepOutDataIdx)
                                                                                      }
                                                                                    >
                                                                                      <i className="icon-close" />
                                                                                    </Button>
                                                                                  </div>
                                                                                </CardHeader>
                                                                                <Collapse
                                                                                  isOpen={
                                                                                    this
                                                                                      .state
                                                                                      .collapse
                                                                                  }
                                                                                  id="collapseExample"
                                                                                >
                                                                                  <CardBody>
                                                                                    <Form className="form-horizontal">
                                                                                      <FormGroup
                                                                                        row
                                                                                      >
                                                                                        <Col md="3">
                                                                                          <Label htmlFor="source_data">
                                                                                            Source
                                                                                            Data
                                                                                          </Label>
                                                                                        </Col>
                                                                                        <Col
                                                                                          xs="12"
                                                                                          md="9"
                                                                                        >
                                                                                          <Input
                                                                                            type="text"
                                                                                            name={
                                                                                              source_dataId
                                                                                            }
                                                                                            data-id={
                                                                                              stepOutDataIdx
                                                                                            }
                                                                                            id={
                                                                                              source_dataId
                                                                                            }
                                                                                            value={stepOut.data[stepOutDataIdx].source_data}
                                                                                            onChange={(event) => this.handleChangeStepOutData(stepInIdx, stepOutIdx, stepOutDataIdx, event, "source_data")}
                                                                                            placeholder="Enter Source Data"
                                                                                          />
                                                                                        </Col>
                                                                                      </FormGroup>
                                                                                      <FormGroup
                                                                                        row
                                                                                      >
                                                                                        <Col md="3">
                                                                                          <Label htmlFor="target_data">
                                                                                            Target
                                                                                            Data
                                                                                          </Label>
                                                                                        </Col>
                                                                                        <Col
                                                                                          xs="12"
                                                                                          md="9"
                                                                                        >
                                                                                          <Input
                                                                                            type="text"
                                                                                            name={
                                                                                              target_dataId
                                                                                            }
                                                                                            data-id={
                                                                                              stepOutDataIdx
                                                                                            }
                                                                                            id={
                                                                                              target_dataId
                                                                                            }
                                                                                            value={stepOut.data[stepOutDataIdx].target_data}
                                                                                            onChange={(event) => this.handleChangeStepOutData(stepInIdx, stepOutIdx, stepOutDataIdx, event, "target_data")}
                                                                                            placeholder="Enter Target Data"
                                                                                          />
                                                                                        </Col>
                                                                                      </FormGroup>
                                                                                      <FormGroup
                                                                                        row
                                                                                      >
                                                                                        <Col md="3">
                                                                                          <Label htmlFor="target_name">
                                                                                            Target
                                                                                            Name
                                                                                          </Label>
                                                                                        </Col>
                                                                                        <Col
                                                                                          xs="12"
                                                                                          md="9"
                                                                                        >
                                                                                          <Input
                                                                                            type="text"
                                                                                            name={
                                                                                              target_nameId
                                                                                            }
                                                                                            data-id={
                                                                                              stepOutDataIdx
                                                                                            }
                                                                                            id={
                                                                                              target_nameId
                                                                                            }
                                                                                            value={stepOut.data[stepOutDataIdx].target_name}
                                                                                            onChange={(event) => this.handleChangeStepOutData(stepInIdx, stepOutIdx, stepOutDataIdx, event, "target_name")}
                                                                                            placeholder="Enter Target Name"
                                                                                          />
                                                                                        </Col>
                                                                                      </FormGroup>
                                                                                      <FormGroup
                                                                                        row
                                                                                      >
                                                                                        <Col md="3">
                                                                                          <Label htmlFor="target_step">
                                                                                            Target
                                                                                            Step
                                                                                          </Label>
                                                                                        </Col>
                                                                                        <Col
                                                                                          xs="12"
                                                                                          md="9"
                                                                                        >
                                                                                          <Input
                                                                                            type="text"
                                                                                            name={
                                                                                              target_stepId
                                                                                            }
                                                                                            data-id={
                                                                                              stepOutDataIdx
                                                                                            }
                                                                                            id={
                                                                                              target_stepId
                                                                                            }
                                                                                            value={stepOut.data[stepOutDataIdx].target_step}
                                                                                            onChange={(event) => this.handleChangeStepOutData(stepInIdx, stepOutIdx, stepOutDataIdx, event, "target_step")}
                                                                                            placeholder="Enter Target Step"
                                                                                          />
                                                                                        </Col>
                                                                                      </FormGroup>
                                                                                      <FormGroup
                                                                                        row
                                                                                      >
                                                                                        <Col md="3">
                                                                                          <Label htmlFor="key">
                                                                                            Key
                                                                                          </Label>
                                                                                        </Col>
                                                                                        <Col
                                                                                          xs="12"
                                                                                          md="9"
                                                                                        >
                                                                                          <Input
                                                                                            type="text"
                                                                                            name={
                                                                                              keyId
                                                                                            }
                                                                                            data-id={
                                                                                              stepOutDataIdx
                                                                                            }
                                                                                            id={
                                                                                              keyId
                                                                                            }
                                                                                            value={stepOut.data[stepOutDataIdx].key}
                                                                                            onChange={(event) => this.handleChangeStepOutData(stepInIdx, stepOutIdx, stepOutDataIdx, event, "key")}
                                                                                            placeholder="Enter Key"
                                                                                          />
                                                                                        </Col>
                                                                                      </FormGroup>
                                                                                      <FormGroup
                                                                                        row
                                                                                      >
                                                                                        <Col md="3">
                                                                                          <Label htmlFor="pre_value">
                                                                                            Pre
                                                                                            Value
                                                                                          </Label>
                                                                                        </Col>
                                                                                        <Col
                                                                                          xs="12"
                                                                                          md="9"
                                                                                        >
                                                                                          <Input
                                                                                            type="text"
                                                                                            name={
                                                                                              pre_valueId
                                                                                            }
                                                                                            data-id={
                                                                                              stepOutDataIdx
                                                                                            }
                                                                                            id={
                                                                                              pre_valueId
                                                                                            }
                                                                                            value={stepOut.data[stepOutDataIdx].pre_value}
                                                                                            onChange={(event) => this.handleChangeStepOutData(stepInIdx, stepOutIdx, stepOutDataIdx, event, "pre_value")}
                                                                                            placeholder="Enter Pre Value"
                                                                                          />
                                                                                        </Col>
                                                                                      </FormGroup>
                                                                                      <FormGroup
                                                                                        row
                                                                                      >
                                                                                        <Col md="3">
                                                                                          <Label htmlFor="post_value">
                                                                                            Post
                                                                                            Value
                                                                                          </Label>
                                                                                        </Col>
                                                                                        <Col
                                                                                          xs="12"
                                                                                          md="9"
                                                                                        >
                                                                                          <Input
                                                                                            type="text"
                                                                                            name={
                                                                                              post_valueId
                                                                                            }
                                                                                            data-id={
                                                                                              stepOutDataIdx
                                                                                            }
                                                                                            id={
                                                                                              post_valueId
                                                                                            }
                                                                                            value={stepOut.data[stepOutDataIdx].post_value}
                                                                                            onChange={(event) => this.handleChangeStepOutData(stepInIdx, stepOutIdx, stepOutDataIdx, event, "post_value")}
                                                                                            placeholder="Enter Post Value"
                                                                                          />
                                                                                        </Col>
                                                                                      </FormGroup>
                                                                                    </Form>
                                                                                  </CardBody>
                                                                                </Collapse>
                                                                              </Card>
                                                                            );
                                                                          }
                                                                        )}
                                                                      </Fade>
                                                                    </Col>
                                                                  </Row>
                                                                </Fade>
                                                              </Col>
                                                            </Row>
                                                          </Form>
                                                        </CardBody>
                                                      </Collapse>
                                                    </Card>
                                                  );
                                                }
                                              )}
                                            </Fade>
                                          </Col>
                                        </Row>
                                      </Form>
                                    </CardBody>
                                  </Collapse>
                                </Card>
                              );
                            })}
                          </Fade>
                        </Col>
                      </Row>
                    ):null}

                  <FormGroup row>
                    <Col md="3">
                      <Label>Status</Label>
                    </Col>
                    <Col md="9">
                      <FormGroup check inline>
                        <Input
                          className="form-check-input"
                          type="radio"
                          id="true"
                          name="status"
                          value="true"
                          checked={this.state.biller.status === 'true'}
                          onChange={(event) => this.handleChangeBiller(event, "status")}
                        />
                        <Label
                          className="form-check-label"
                          check
                          htmlFor="true">
                          True
                        </Label>
                      </FormGroup>
                      <FormGroup check inline>
                        <Input
                          className="form-check-input"
                          type="radio"
                          id="false"
                          name="status"
                          value="false"
                          checked={this.state.biller.status === 'false'}
                          onChange={(event) => this.handleChangeBiller(event, "status")}
                        />
                        <Label
                          className="form-check-label"
                          check
                          htmlFor="false">
                          False
                        </Label>
                      </FormGroup>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                  <Col md="3">
                    <Label>Additional Form</Label>
                  </Col>
                  </FormGroup>
                  <Button
                    onClick={this.addForm}
                    className="mr-2"
                    color="primary"
                    color="primary">
                    <i className="fa fa-plus"/>
                    &nbsp;Add Form
                  </Button>
                  <br/>
                  <br/>
                  {this.state.biller.additional_data.map((additional_data, additionalDataIdx) => {
                    const keyId = `key-${additionalDataIdx}`,
                      valueId = `value-${additionalDataIdx}`;
                    return (
                      <FormGroup row inline>
                        <Col md="3">
                          <Label>Input additional Data {additionalDataIdx + 1}</Label>
                        </Col>
                        <FormGroup className="pr-3">
                          <Input type="text"
                                 placeholder="Title or Key"
                                 name={keyId}
                                 data-id={additionalDataIdx}
                                 id={keyId}
                                 value={additional_data[0]}
                                 onChange={(event) => this.handleChangeaddForm(additionalDataIdx, event, "additional_data_key")}
                                 required/>
                        </FormGroup>
                        <FormGroup className="pr-3">
                          <Input type="text"
                                 placeholder="Field or Value"
                                 name={valueId}
                                 data-id={additionalDataIdx}
                                 id={valueId}
                                 value={additional_data[1]}
                                 onChange={(event) => this.handleChangeaddForm(additionalDataIdx, event, "additional_data_value")}
                                 required/>
                        </FormGroup>
                      <FormGroup>
                        <Button
                          onClick={() => this.onDeleteaddForm(additionalDataIdx)}
                          color="danger">
                          <i className="fa fa-close"/>
                        </Button>
                      </FormGroup>
                      </FormGroup>
                    )
                  })}

                </Form>
              </CardBody>
              <CardFooter>
                <Button
                  type="submit"
                  size="sm"
                  color="primary"
                  className="mr-2"
                  onClick={this.handleSubmitBiller}>
                  <i className="fa fa-dot-circle-o" /> Submit
                </Button>
                <Button
                  type="reset"
                  size="sm"
                  color="danger"
                  onClick={this.handleSubmitStepin}>
                  <i className="fa fa-ban" /> Reset
                </Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Forms;
