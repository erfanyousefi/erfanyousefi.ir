<template>
  <div class="form-label-group">
    <input
      autocomplete="off"
      :type="rules.type"
      :id="rules.id"
      class="form-control"
      :placeholder="rules.placeholder"
      :required="rules.required"
      v-model="input"
    />
    <label :for="rules.id">{{ rules.placeholder }}</label>
    <p class="error">{{ error }}</p>
  </div>
</template>

<script>
import { ref, watch } from "vue";
export default {
  props: {
    rules: Object,
  },
  setup(props, { emit }) {
    let input = ref("");
    let error = ref("");
    function validate(value) {
      value = value.trim();
      if (props.rules.required && !value) {
        error.value = `ورودی ${props.rules.placeholder} اجباری میباشد`;
      } else if (props.rules.min && value.length < props.rules.min) {
        error.value = `طول ورودی ${props.rules.placeholder} نمیتواند کمتر از ${props.rules.min} کاراکتر باشد`;
      } else if (props.rules.max && value.length > props.rules.max) {
        error.value = `طول ورودی ${props.rules.placeholder} نمیتواند بیشتر از ${props.rules.max} کاراکتر باشد`;
      } else if (props.rules.id === "email") {
        let regex =
          /^[a-zA-Z]+[a-zA-Z0-9._]*@[a-zA-Z]{2,10}.[a-zA-Z]{2,10}$/;
        let result = regex.test(value);
        if (!result) {
          error.value = "فرمت وارد شده ی ایمیل صحیح نمیباشد";
        } else {
          emit("inputValue", {[props.rules.id] :value});
          error.value = "";
        }
      } else {
        emit("inputValue", {[props.rules.id]:value});
        error.value = "";
      }
    }
    watch(input, (value) => {
      validate(value);
    });
    return {
      input,
      error,
    };
  },
};
</script>

<style scoped>
.error {
  color: rgb(235, 54, 99);
  font-size: 13px;
  font-weight: bold;
  margin: 3px;
}
.form-label-group {
  position: relative;
  margin: 20px auto;
}

.form-label-group input {
  height: auto;
  border-radius: 10px;
  box-shadow: unset;
}

.form-label-group > input {
  padding: var(10px) var(20px);
}

.form-label-group > label {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  /* Override default `<label>` margin */
  line-height: 35px;
  color: #495057;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  transition: all 0.1s ease-in-out;
}

.form-label-group input::-webkit-input-placeholder {
  color: transparent;
}

.form-label-group input:-ms-input-placeholder {
  color: transparent;
}

.form-label-group input::-ms-input-placeholder {
  color: transparent;
}

.form-label-group input::-moz-placeholder {
  color: transparent;
}

.form-label-group input::placeholder {
  color: transparent;
}

.form-label-group input:not(:placeholder-shown) {
  top: 0;
}

.form-label-group input:not(:placeholder-shown) ~ label {
  font-size: 12px;
  right: 40px;
  color: #777;
  top: -10px;
  background: white;
  width: fit-content;
  height: fit-content;
  line-height: 10px;
}

/* Fallback for Edge
-------------------------------------------------- */

@supports (-ms-ime-align: auto) {
  .form-label-group > label {
    display: none;
  }
  .form-label-group input::-ms-input-placeholder {
    color: #777;
  }
}

/* Fallback for IE
-------------------------------------------------- */

@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
  .form-label-group > label {
    display: none;
  }
  .form-label-group input:-ms-input-placeholder {
    color: #777;
  }
}
</style>