var CharCount = Class.create({
  initialize: function(el, options) {
    this.options = Object.extend({
      countId: 'count',
      html: '<div class="char-count"><span id="#{id}"></span></div>',
      limit: null,
      limitNote: '<span class="limit-note">(Max length: #{limit})</span>'
    }, options || {});
    this.el = $(el);
    this.build();
  },
  build: function() {
    var htmlTemplate = new Template(this.options.html),
        limitTemplate;
    this.el.insert({ after: htmlTemplate.evaluate({ 'id' : this.options.countId }) });
    this.count = $(this.options.countId);
    if (this.options.limit) {
      limitTemplate = new Template(this.options.limitNote);
      this.count.insert({ after : limitTemplate.evaluate({ limit: this.options.limit }) });
    }
    this.updateCount();
    this.el.observe('keyup', this.updateCount.bind(this));
  },
  updateCount: function() {
    var valueLen = $F(this.el).length;
    if(this.options.limit !== null) {
      if ( valueLen >= this.options.limit ) {
        var val = $F(this.el).substring(0, this.options.limit);
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