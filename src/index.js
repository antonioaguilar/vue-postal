import eventBus from './eventBus.js';

let event = eventBus();

function vuePostal(Vue) {

  // exit if the plugin has already been installed.
  if(vuePostal.installed) return;

  // reset the event bus before using it
  event.reset();

  // extend Vue.prototype
  Object.defineProperty(Vue.prototype, '$event', {
    get: function() {
      let self = this;
      return {
        subscribe: function() {
          let sub = event.subscribe.apply(event, arguments);
          sub.onUnsubscribe = self.$on('hook:beforeDestroy', function() {
            sub.unsubscribe();
          });
          return sub;
        },
        publish: event.publish.bind(event),
        wiretap: event.wiretap.bind(event),
        when: event.when.bind(event),
        reset: event.reset
      };
    }
  });

}

// install the plugin automatically
if(typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(vuePostal)
}

export default vuePostal;
