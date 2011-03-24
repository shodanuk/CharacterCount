CharacterCount = Class.create({
  initialize: function(el, options) {
    this.options = Object.extend({
      html: '<div class="char-count"><span></span></div>',
      limit: null,
      limitNote: '<span class="limit-note">(Max length: #{limit})</span>',
      wrapperClass: 'char-count-wrapper'
    }, options || {});
    this.el = $(el);
    this.build();
  },
  build: function() {
    var limitTemplate;
    this.wrapper = new Element('div').addClassName(this.options.wrapperClass);
    Element.wrap(this.el, this.wrapper);
    this.wrapper.insert({ bottom : this.options.html });
    this.count = this.wrapper.down('span');
    if ( this.options.limit ) {
      limitTemplate = new Template(this.options.limitNote);
      this.count.insert({ after : limitTemplate.evaluate({ limit: this.options.limit }) });
    }
    this.updateCount();
    this.el.observe('keyup', this.updateCount.bind(this));
  },
  updateCount: function() {
    var valueLen = $F(this.el).length, val;
    if(this.options.limit !== null) {
      if ( valueLen >= this.options.limit ) {
        val = $F(this.el).substring(0, this.options.limit);
        this.el.setValue(val);
        this.count.addClassName('limit');
        valueLen = this.options.limit;
      } else {
        if ( this.count.hasClassName('limit') ) {
          this.count.removeClassName('limit');
        }
      }
    }
    this.count.update(valueLen);
  }
});