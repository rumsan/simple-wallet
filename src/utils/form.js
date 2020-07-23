class Form {
  constructor(cfg) {
    if (!$) throw Error('jQuery($) library is not found');
    Object.assign(this, cfg);

    $(this.target).submit((e) => {
      e.preventDefault();
      if (this.onSubmit) this.onSubmit(e);
    });
  }

  get() {
    return this.getValues();
  }

  set(data, fields) {
    return this.setValues(data, fields);
  }

  getValues() {
    const data = {};
    $(`${this.target} :input`).each(function () {
      if (!this.name) return;
      let { value } = this;
      if (this.type == 'checkbox') {
        value = this.checked;
      }
      if (this.type == 'radio') {
        value = $(`input[name="${this.name}"]:checked`).val();
      }
      if (this.type == 'select') {
        value = $(`select[name="${this.name}"]`).val();
      }
      const group = $(this).data('group');
      if (group) {
        data[group] = {
          ...data[group],
          ...{
            [this.name]: value,
          },
        };
      } else {
        data[this.name] = value;
      }
    });
    return data;
  }

  setValues(data, fields) {
    if (!fields) {
      fields = [];
      for (const key in data) {
        fields.push(key);
      }
    } else {
      fields = fields.split(',');
    }

    const nested = [];

    fields.forEach((f) => {
      const datatype = typeof data[f];
      if (datatype === 'string' || datatype === 'number' || datatype === 'boolean') {
        $(`${this.target} input[name=${f}]:not([group])`).val(data[f]);
        $(`${this.target} select[name=${f}]:not([group])`).val(data[f]);
        $(`${this.target} textarea[name=${f}]:not([group])`).val(data[f]);
      } else if (data[f] == null) {
        $(`${this.target} input[name=${f}]:not([group])`).val('');
        $(`${this.target} select[name=${f}]:not([group])`).val('');
        $(`${this.target} textarea[name=${f}]:not([group])`).val('');
      } else if (datatype === 'object') {
        if (!Array.isArray(data[f])) nested.push(f);
      }
    });
    nested.forEach((nestedf) => {
      const nestedData = data[nestedf];
      const innerFields = [];
      for (const key in nestedData) {
        innerFields.push(key);
      }
      innerFields.forEach((inf) => {
        const innerData = nestedData[inf];
        const innerDatatype = typeof innerData;
        if (
          innerDatatype === 'string'
          || innerDatatype === 'number'
          || innerDatatype === 'boolean'
        ) {
          $(`${this.target} input[name=${inf}][data-group=${nestedf}]`).val(innerData);
          $(`${this.target} select[name=${inf}][data-group=${nestedf}]`).val(innerData);
          $(`${this.target} textarea[name=${inf}][data-group=${nestedf}]`).val(innerData);
        } else {
          $(`${this.target} input[name=${inf}][data-group=${nestedf}]`).val('');
          $(`${this.target} select[name=${inf}][data-group=${nestedf}]`).val('');
          $(`${this.target} textarea[name=${inf}][data-group=${nestedf}]`).val('');
        }
      });
    });
  }

  clear() {
    $(':input', this.target)
      .not(':button, :submit, :reset')
      .val('')
      .prop('checked', false)
      .prop('selected', false);
  }
}

export default Form;
