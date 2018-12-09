export default {
  extractErrors: obj => {
    let errors = {};
    let keys = Object.keys(obj);

    for (const key of keys) {
      errors = { ...errors, [key]: obj[key].message };
    }
    return errors;
  }
};
