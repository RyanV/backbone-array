
(function (a, c) {
  var d = a.Array = function (a, c) {
    c || (c = {});
    if (c.model) this.model = c.model;
    this.length = 0;
    this.models = [];
    this._reset();
    this.initialize.apply(this, arguments);
    a && this.reset(a, {
      silent: true,
      parse: c.parse
    })
  };
  c.extend(d.prototype, a.Events, {
    model: a.Model,
    initialize: function () {},
    at: function (a) {
      return this.models[a]
    },
    slice: function (a, c) {
      return this.models.slice(a, c)
    },
    concat: function () {
      var a = this.clone();
      a.push(arguments);
      return a
    },
    splice: function (a, d, f, g) {
      var h, j, l, m = [],
        a = c.isNumber(a) && !c.isNaN(a) ? a : 0,
        d = c.isNumber(d) && !c.isNaN(d) ? d : 0;
      g || (g = {});
      f || (f = []);
      f = c.isArray(f) ? f.slice() : [f];
      for (h = 0, j = f.length; h < j; h++) {
        if (!(l = f[h] = this._prepareModel(f[h], g))) throw Error("Can't add an invalid model to a collection");
        l.off("all", this._onModelEvent, this);
        l.on("all", this._onModelEvent, this)
      }
      m = Array.prototype.splice.apply(this.models, [a, d].concat(f));
      this.length = this.models.length;
      for (h = 0, j = m.length; h < j; h++) l = m[h], g.index = a + h, g.silent || l.trigger("remove", l, this, g), this._removeReference(l);
      for (h = 0, j = f.length; h < j && !g.silent; h++) l = f[h], g.index = h + a, l.trigger("add", l, this, g);
      return m
    },
    push: function (a, c) {
      this.splice(this.length, 0, a, c);
      return a
    },
    pop: function (a) {
      return this.splice(this.length - 1, 1, [], a)[0]
    },
    shift: function (a) {
      return this.splice(0, 1, [], a)[0]
    },
    unshift: function (a, c) {
      this.splice(0, 0, a, c);
      return a
    },
    reverse: function (a) {
      this.reset(this.models.reverse(), a)
    },
    move: function (a, c, d) {
      if (!(a === c || !this.at(a) || c >= this.length || c < 0)) d || (d = {}), this.models.splice(c, 0, this.models.splice(a, 1)[0]), d.indexes = [a, c], d.silent || this.trigger("move", this, d)
    },
    sort: function (a) {
      a || (a = {});
      if (!a.comparator) throw Error("Cannot sort a set without a comparator");
      var d = c.bind(a.comparator, this);
      this.comparator.length == 1 ? this.models = this.sortBy(d) : this.models.sort(d);
      a.silent || this.trigger("reset", this, a);
      return this
    },
    reset: function (a, d) {
      a || (a = []);
      d || (d = {});
      var f = c.extend({
        silent: true
      }, d);
      this.splice(0, this.models.length, [], f);
      this._reset();
      this.splice(0, 0, a, f);
      d.silent || this.trigger("reset", this, d);
      return this
    },
    add: function (a, c) {
      c || (c = {});
      this.splice(c.at != null ? c.at : this.models.length, 0, a, c);
      return this
    },
    remove: function (a, d) {
      d || (d = {});
      var a = c.isArray(a) ? a.slice() : [a],
        f, g, h = [],
        j = [],
        l = a.length;
      for (f = 0; f < l; f++) g = a[f], j[g.cid] = true, h[g.id] = true;
      for (f = 0; f < this.length; f++) g = this.models[f], (j[g.cid] === true || h[g.id] === true) && this.splice(f, 1, [], d);
      return this
    },
    get: function (a) {
      return this.find(function (c) {
        return c.id === a || a && c.id === a.id
      })
    },
    getByCid: function (a) {
      return this.find(function (c) {
        return c.cid === a || a && c.cid === a.cid
      })
    },
    getAll: function (a) {
      return this.filter(function (c) {
        return c.id === a || a && c.id === a.id
      })
    },
    getAllByCid: function (a) {
      return this.filter(function (c) {
        return c.cid === a || a && c.cid === a.cid
      })
    },
    _reset: function () {},
    _onModelEvent: function (a, c, d, g) {
      (a == "add" || a == "remove") && d != this || (a == "destroy" && this.remove(c, g), this.trigger.apply(this, arguments))
    }
  });
  c.each("forEach,each,map,reduce,reduceRight,find,detect,filter,select,reject,every,all,some,any,include,contains,invoke,max,min,sortBy,sortedIndex,toArray,size,first,initial,rest,last,without,indexOf,shuffle,lastIndexOf,isEmpty,groupBy".split(","),

    function (a) {
      d.prototype[a] = function () {
        return c[a].apply(c, [this.models].concat(c.toArray(arguments)))
      }
    });
  c.each("toJSON,sync,fetch,create,parse,clone,pluck,where,chain,_prepareModel,_removeReference".split(","), function (b) {
    a.Array.prototype[b] = a.Collection.prototype[b]
  });
  d.extend = a.Model.extend
})(Backbone, _);
