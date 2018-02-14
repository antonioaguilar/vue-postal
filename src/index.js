import eventBus from './eventBus.js';

let event = eventBus();

function vuePostal(Vue) {

  if(vuePostal.installed) return;

  event.reset();

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
        when: function() {
          let dispose = event.when.apply(event, arguments);
          self.$on('hook:beforeDestroy', function() {
            dispose();
          });
          return dispose;
        },
        publish: event.publish.bind(event),
        wiretap: event.wiretap.bind(event),
        reset: event.reset
      };
    }
  });

}

if(typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(vuePostal)
}

export default vuePostal;
