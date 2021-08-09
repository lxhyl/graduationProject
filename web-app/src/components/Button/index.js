/**
 *  props
 *  @param options 配置
 */

let timer = null;
export default {
  props: ["options"],
  data() {
    return {
      config: null
    };
  },
  computed: {
    type() {
      const status = this.options.status;
      switch (status) {
        case "init":
          return this.options.type;
        case "click":
          return "info";
        case "success":
          return "success";
        case "fail":
          return "danger";
      }
    }
  },
  watch: {
    "options.status": function(v) {
      if (v === "click") {
        this.options.disabled = true;
      }
      if (v === "fail") {
        timer = setTimeout(() => {
          this.options.status = "init";
          this.options.disabled = false;
          clearTimeout(timer);
        }, 1000);
      }
    }
  },
  methods: {
    renderStatus() {
      const status = this.options.status;
      switch (status) {
        case "init":
          return this.options.initText;
        case "click":
          return <i class="el-icon-loading"></i>;
        case "success":
          return this.options.successText;
        case "fail":
          return this.options.failText;
        default:
          return "error";
      }
    }
  },
  render() {
    return (
      <el-button type={this.type} disabled={this.options.disabled}>
        {this.renderStatus()}
      </el-button>
    );
  }
};
