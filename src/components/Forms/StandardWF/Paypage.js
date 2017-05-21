import React, {PropTypes} from 'react';
import {Button, Form} from 'react-bootstrap';
import {UploaderModal} from 'containers/Uploader/modal';
import {FieldGroup, ImgGroup, FontGroup, ColorGroup} from 'components/Forms/utils';


export class PaypageForm extends React.PureComponent {
  constructor(props) {
    super(props);
    const {paypage} = props;
    this.state = {...paypage};
    this.savePaypage = this.savePaypage.bind(this);
  }

  savePaypage() {
    return this.props.savePaypage(this.state);
  }

  handleOpen(saveFunc) {
    return () => {
      this.props.activingTab(1);
      this.props.saveFuncActive(saveFunc);
      return this.props.uploaderFormMng();
    };
  }
  render() {
    const saversImages = {
      header: (img) => this.setState({header_img: img}),
      background_img: (img) => this.setState({background_img: img}),
    };
    return (
        <Form>
          {this.props.uploaderForm && <UploaderModal saveImage={saversImages} saveSound={() => {}} dialog={this.props.uploaderForm} dialogOpen={this.props.uploaderFormMng}/>}
          <FieldGroup id="name" type="text" label="Название" placeholder="Название" defaultValue={this.state.name} onChange={(input) => this.setState({name: input.target.value})}/>
          {/* header prefs*/}
          <FieldGroup id="header_title" type="text" label="Заголовок шапки" placeholder="Заголовок шапки" defaultValue={this.state.header_title} onChange={(input) => this.setState({header_title: input.target.value})}/>
          <FieldGroup id="header_desc" type="text" label="Описание шапки" placeholder="Описание шапки" defaultValue={this.state.header_desc} onChange={(input) => this.setState({header_desc: input.target.value})}/>
          <FieldGroup id="header_chans" type="text" help="ссылки разделённые ';'" label="Ссылки в шапки" placeholder="Ссылки в шапки" defaultValue={this.state.header_chans} onChange={(input) => this.setState({header_chans: input.target.value})}/>
          <ColorGroup id="header_text_color" label="Цвет текста в шапке" color={this.state.header_text_color} onChange={({rgb}) => this.setState({header_text_color: JSON.stringify(rgb)})}/>
          <ImgGroup label="Картинка шапки" img={this.state.header_img} onChange={this.handleOpen('header')} onDelete={() => this.setState({header_img: ''})} userId={this.props.userId}/>
          <ColorGroup id="header_color" label="Цвет шапки" color={this.state.header_color} onChange={({rgb}) => this.setState({header_color: JSON.stringify(rgb)})}/>
          <FontGroup id="header_font" label="Шрифт" placeholder="Шрифт" defaultValue={this.state.header_font} onChange={(input) => this.setState({header_font: input.target.value})}/>
          {/* backgroud prefs*/}
          <ColorGroup id="background_color" label="Фон" color={this.state.background_color} onChange={({rgb}) => this.setState({background_color: JSON.stringify(rgb)})}/>
          <ImgGroup label="Изображение фона" img={this.state.background_img} onChange={this.handleOpen('background_img')} onDelete={() => this.setState({backgroud_img: ''})} userId={this.props.userId}/>
          {/* main prefs*/}
          <FieldGroup id="main_title" type="text" label="Заголовок главного окна" placeholder="Заголовок главного окна" defaultValue={this.state.main_title} onChange={(input) => this.setState({main_title: input.target.value})}/>
          <ColorGroup id="main_title_color" label="Цвет заголовка главного окна" color={this.state.main_title_color} onChange={({rgb}) => this.setState({main_title_color: JSON.stringify(rgb)})}/>
          <FieldGroup id="main_desc" type="text" label="Описание главного окна" placeholder="Описание главного окна" defaultValue={this.state.main_desc} onChange={(input) => this.setState({main_desc: input.target.value})}/>
          <ColorGroup id="main_desc_color" label="Цвет текста главного окна" color={this.state.main_desc_color} onChange={({rgb}) => this.setState({main_desc_color: JSON.stringify(rgb)})}/>
          <FontGroup id="main_font" label="Шрифт главного окна" placeholder="Шрифт главного окна" defaultValue={this.state.main_font} onChange={(input) => this.setState({main_font: input.target.value})}/>
          {/* button prefs*/}
          <ColorGroup id="button_collor" label="Цвет кнопки оплаты" color={this.state.button_color} onChange={({rgb}) => this.setState({button_color: JSON.stringify(rgb)})}/>
          <FieldGroup id="button_text" type="text" label="Текст кнопки оплаты" placeholder="Текст кнопки оплаты" defaultValue={this.state.button_text} onChange={(input) => this.setState({button_text: input.target.value})}/>
          <Button onClick={this.savePaypage}>Save</Button>
          <Button onClick={this.props.cancel}>Отмена</Button>
        </Form>
    );
  }
}

PaypageForm.propTypes = {
  paypage: PropTypes.object.isRequired,
  savePaypage: PropTypes.func.isRequired,
  saveFuncActive: PropTypes.func.isRequired,
  activingTab: PropTypes.func.isRequired,
  uploaderFormMng: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
  uploaderForm: PropTypes.bool.isRequired,
  userId: PropTypes.number.isRequired,
};
