# Select

Custom select element to allow styling of options inside the dropdown. 

The value has to be managed by the parent component.

## Example Usage

```jsx
import Select from './Input/Select';

<Select value={this.state.value} onChange={(value) => this.setState({value})}>
    <Select.Option value={1}>This is the first <i>option</i></Select.Option>
    <Select.Option value={2}>This is another option</Select.Option>
    <Select.Group label={'This is a group'}>
        <Select.Option value={2} disabled>Disabled Option</Select.Option>
    </Select.Group>
</Select>
```

## Props
### Select

| property    | type      | description                                       |
| ----------- | --------- | ------------------------------------------------- |
| children    | `node`    | `Select.Option` or `Select.Group` components      |
| className   | `string?` | Additional classnames added to the select element |
| disabled    | `bool?`   | Disable the Select                                |
| onChange    | `func?`   | Event callback                                    |
| placeholder | `string?` | Value that is shown when no option is selected    |
| value       | `any`     | The currently selected value                      |

### Option

| property    | type      | description              |
| ----------- | --------- | ------------------------ |
| children    | `node`    | Contents of the option   |
| disabled    | `bool?`   | Disables this option     |
| value       | `any`     | The value of this option |

### Group

| property    | type      | description                        |
| ----------- | --------- | ---------------------------------- |
| children    | `node`    | `Select.Option`s inside this group |
| label       | `string`  | The label describing this group    |
