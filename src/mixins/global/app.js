import { mapState } from "vuex";
export default {
  options: { styleIsolation: "apply-shared" },
  computed: {
    ...mapState("app", ["darkMode", "navbarHeight"]),
  },
};
