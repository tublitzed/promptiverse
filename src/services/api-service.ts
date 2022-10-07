declare global {
  interface Window {
    promptiverse: any;
  }
}

window.promptiverse = window.promptiverse || {};

const ApiService = {
  getVar: (name: any) => {
    if (!window.promptiverse || !window.promptiverse.vars) {
      return undefined;
    }
    return window.promptiverse.vars[name];
  },
};

export default ApiService;
