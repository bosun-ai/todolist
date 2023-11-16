import React from "react";
import { withTranslation } from 'react-i18next';
import { Item } from "./ToDoList";

const isValid = (item: Item): boolean => {
  return item.task !== "" && item.priority !== -1;
};

class AddItem extends React.Component<{ addItem: any, t: any }, Item> {
  constructor(props: any) {
    super(props);
    this.state = {
      task: "",
      priority: -1,
    };
    this.setTask = this.setTask.bind(this);
    this.setPriority = this.setPriority.bind(this);
    this.addItem = this.addItem.bind(this);
  }

  setTask(evt: any) {
    this.setState({
      task: evt.target.value,
    });
  }

  setPriority(evt: any) {
    this.setState({
      priority: parseInt(evt.target.value),
    });
  }

  addItem(evt: any) {
    const item = this.state;
    if (isValid(item)) {
      this.props.addItem(item);
    }

    this.setState({
      task: "",
      priority: -1,
    });
  }

  render() {
    const { t } = this.props;
    return (
      <table>
        <tbody>
          <tr key={""}>
            <td>{t('taskLabel')}</td>
            <td>
              <input
                id="task"
                type="text"
                placeholder={t('taskPlaceholder')}
                onChange={this.setTask}
              />
            </td>
            <td>{t('priorityLabel')}</td>
            <td>
              <input
                id="priority"
                type="text"
                placeholder={t('priorityPlaceholder')}
                onChange={this.setPriority}
              />
            </td>
            <td>
              <input id="submit" type="submit" value={t('addButton')} onClick={this.addItem} />
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export { AddItem };
export default withTranslation()(AddItem);