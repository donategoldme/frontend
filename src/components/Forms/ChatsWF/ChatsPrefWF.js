import React, {PropTypes} from 'react';
import {FormGroup, Button, ControlLabel, Form, HelpBlock} from 'react-bootstrap';
import { SketchPicker } from 'react-color';


export function ChatsPrefWF(props) {
  let width = null;
  let height = null;
  let colorMessage = props.widget.color_message || '{}';
  let colorNicks = props.widget.color_nicks || '{}';
  let colorBg = props.widget.color_bg || '{}';
  let fontSize = null;
  let fontFamily = null;
  let padding = null;
  let marginBot = null;
  let borderRadius = null;
  let badges = null;
  let css = null;
  const saveWidget = () => {
    return () => {
      console.log(badges);
      const {widget} = props;
      widget.width = +width.value;
      widget.height = +height.value;
      widget.color_message = colorMessage;
      widget.color_nicks = colorNicks;
      widget.color_bg = colorBg;
      widget.font_size = +fontSize.value;
      widget.font_family = fontFamily.value;
      widget.padding = +padding.value;
      widget.margin_bot = +marginBot.value;
      widget.border_radius = +borderRadius.value;
      widget.badges = badges.checked;
      widget.css = css.value;
      return props.saveWidget(widget);
    };
  };
  return (
      <Form>
        <FormGroup>
          <ControlLabel>
            Ширина чата:
          </ControlLabel>
          <input type="number" className="form-control" defaultValue={props.widget.width} ref={(input) => width = input} />
        </FormGroup>
        <FormGroup>
          <ControlLabel>
            Высота чата:
          </ControlLabel>
          <input type="number" className="form-control" defaultValue={props.widget.height} ref={(input) => height = input} />
        </FormGroup>
        <FormGroup>
          <ControlLabel>
            Цвет текста сообщений:
          </ControlLabel>
          <SketchPicker
            color={JSON.parse(colorMessage)}
            onChangeComplete={ ({rgb}) => colorMessage = JSON.stringify(rgb) }
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>
            Цвет текста никнеймов:
          </ControlLabel>
          <SketchPicker
            color={JSON.parse(colorNicks)}
            onChangeComplete={ ({rgb}) => colorNicks = JSON.stringify(rgb) }
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>
            Цвет фона сообщений:
          </ControlLabel>
          <SketchPicker
            color={JSON.parse(colorBg)}
            onChangeComplete={ ({rgb}) => colorBg = JSON.stringify(rgb) }
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>
            Размер шрифта:
          </ControlLabel>
          <input type="number" className="form-control" defaultValue={props.widget.font_size} ref={(input) => fontSize = input} />
        </FormGroup>
        <FormGroup>
          <ControlLabel>
            Шрифт:
          </ControlLabel>
          <input type="text" className="form-control" defaultValue={props.widget.font_family} ref={(input) => fontFamily = input} />
          <HelpBlock>
          Выберите шрифт на странице <a href="https://fonts.google.com/"
                 target="_blank">google fonts</a> и скопируйте название.
          </HelpBlock>
        </FormGroup>
        <FormGroup>
          <ControlLabel>
            Отступ внутри сообщения:
          </ControlLabel>
          <input type="number" className="form-control" defaultValue={props.widget.padding} ref={(input) => padding = input} />
        </FormGroup>
        <FormGroup>
          <ControlLabel>
            Отступ между сообщениями:
          </ControlLabel>
          <input type="number" className="form-control" defaultValue={props.widget.margin_bot} ref={(input) => marginBot = input} />
        </FormGroup>
        <FormGroup>
          <ControlLabel>
            Закругление сообщений:
          </ControlLabel>
          <input type="number" className="form-control" defaultValue={props.widget.border_radius} ref={(input) => borderRadius = input} />
        </FormGroup>
        <FormGroup>
          <ControlLabel>
            Показывать бейджи(значки модераторов, подписчики):
          </ControlLabel>
          <input type="checkbox" className="form-control" checked={props.widget.badges} ref={(input) => badges = input} />
        </FormGroup>
        <FormGroup>
          <ControlLabel>
            CSS(для более точной настройки):
          </ControlLabel>
          <input type="text" className="form-control" defaultValue={props.widget.css} ref={(input) => css = input} />
          <HelpBlock>
          Поддержка css для более точной настройки отображения.
          Осторожно! При не пустом блоке css - остальные параметры не будут учитываться.
          Не вводите сюда ничего, если вы не являетесь професионалом.
          </HelpBlock>
        </FormGroup>
        <Button onClick={saveWidget()}>Save</Button>
      </Form>
  );
}

ChatsPrefWF.propTypes = {
  widget: PropTypes.object.isRequired,
  saveWidget: PropTypes.func.isRequired,
};
