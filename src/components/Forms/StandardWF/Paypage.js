import React, {PropTypes} from 'react';
import {FormGroup, Button, ControlLabel, Form, Row, Col, Thumbnail} from 'react-bootstrap';
import { SketchPicker } from 'react-color';
import {UploaderModal} from 'containers/Uploader/modal';


export class PaypageForm extends React.PureComponent {
  constructor(props) {
    super(props);
    const {paypage} = props;
    this.state = {...paypage};
    this.savePaypage = this.savePaypage.bind(this);
  }

  savePaypage() {
    // const {paypage} = this.props;
    // paypage.name = name.value;
    // // paypage.active = active.value;

    // paypage.header_title = headerTitle.value;
    // paypage.header_desc = headerDesc.value;
    // paypage.header_chans = headerChans.value;
    // paypage.header_text_color = headerTextColor.value;
    // // paypage.header_color = headerColor.value;
    // // paypage.header_img = headerImg.value;
    // // paypage.header_font = headerFont.value;

    // // paypage.background_color = backgroundColor.value;
    // // paypage.background_img = backgroundImg.value;

    // // paypage.main_title = mainTitle.value;
    // // paypage.main_title_color = mainTitleColor.value;
    // // paypage.main_desc = mainDesc.value;
    // // paypage.main_desc_color = mainDescColor.value;
    // // paypage.main_font = mainFont.value;

    // // paypage.button_collor = buttonCollor.value;
    // // paypage.button_text = buttonText.value;
    console.log(this.state);
    return this.props.savePaypage(this.state);
  }
  saveHeaderImage(img) {
    this.setState({header_img: img});
  }
  deleteHeaderImage() {
    this.setState({headerImg: ''});
  }

  handleOpen(saveFunc) {
    return () => {
      this.props.activingTab(1);
      this.props.saveFuncActive(saveFunc);
      return this.props.uploaderFormMng();
    };
  }
  // const {saveFuncActive} = props;
  render() {
    const saversImages = {header: this.saveHeaderImage.bind(this)};
    return (
        <Form>
          {this.props.uploaderForm && <UploaderModal saveImage={saversImages} saveSound={() => {}} dialog={this.props.uploaderForm} dialogOpen={this.props.uploaderFormMng}/>}
          <FormGroup>
            <ControlLabel>
              Название:
            </ControlLabel>
            <input type="text" className="form-control" defaultValue={this.state.name} onChange={(input) => this.setState({name: input.target.value})} />
          </FormGroup>
          {
            // <FormGroup>
          //   <ControlLabel>
          //     Заголовок шапки:
          //   </ControlLabel>
          //   <input type="text" className="form-control" defaultValue={this.props.paypage.header_title} ref={(input) => headerTitle = input} />
          // </FormGroup>
          // <FormGroup>
          //   <ControlLabel>
          //     Описание шапки:
          //   </ControlLabel>
          //   <input type="text" className="form-control" defaultValue={this.props.paypage.header_desc} ref={(input) => headerDesc = input} />
          // </FormGroup>
          // <FormGroup>
          //   <ControlLabel>
          //     Ссылки в шапки:
          //   </ControlLabel>
          //   <input type="text" className="form-control" defaultValue={this.props.paypage.chans} ref={(input) => headerChans = input} />
          //   <HelpBlock>
          //     ссылки разделённые ";"
          //   </HelpBlock>
          // </FormGroup>
          }
          <FormGroup>
            <ControlLabel>
              Цвет текста в шапке:
            </ControlLabel>
            <SketchPicker
              color={JSON.parse(this.state.header_text_color || '{}')}
              onChangeComplete={ ({rgb}) => this.setState({header_text_color: JSON.stringify(rgb)})}
            />
          </FormGroup>
          <Row>
            <Col xs={12} md={12}>
              <ControlLabel>
                Изображение фона шапки:
              </ControlLabel>
            </Col>
            <Col xs={12} md={2}>
              <Thumbnail onClick={this.handleOpen('header')} src={this.state.header_img ? `/uploads/${this.props.userId}/pic/${this.state.header_img}` : '/uploads/default.png'} responsive>
              <p>{this.state.header_img}</p>
              </Thumbnail>
            </Col>
            <Button onClick={() => this.setState({header_img: ''})}>Убрать</Button>
          </Row>
          <Button onClick={this.savePaypage}>Save</Button>
        </Form>
    );
  }
}

PaypageForm.propTypes = {
  paypage: PropTypes.object.isRequired,
  savePaypage: PropTypes.func.isRequired,
  saveFuncActive: PropTypes.func.isRequired,
  // editImage: PropTypes.func.isRequired,
  // editSound: PropTypes.func.isRequired,
  activingTab: PropTypes.func.isRequired,
  uploaderFormMng: PropTypes.func.isRequired,
  uploaderForm: PropTypes.bool.isRequired,
  userId: PropTypes.number.isRequired,
};
