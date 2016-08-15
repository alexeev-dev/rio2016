// Generated by CoffeeScript 1.9.3
(function() {
  var Collision, Layer, Phrase;

  Collision = (function() {
    var devide_vector, invert_vector, is_point_in;

    function Collision() {}

    Collision.test = function(box_i, box_j, iteration) {
      var exit_vectors, vector_x, vector_y;
      if (iteration == null) {
        iteration = 0;
      }
      exit_vectors = [];
      if (is_point_in(box_j[0], box_j[2], box_i)) {
        exit_vectors.push([box_i[1] - box_2[0], box_i[3] - box_2[2]]);
      }
      if (is_point_in(box_j[1], box_j[2], box_i)) {
        exit_vectors.push([box_i[0] - box_j[1], box_i[3] - box_j[2]]);
      }
      if (is_point_in(box_j[1], box_j[3], box_i)) {
        exit_vectors.push([box_i[0] - box_j[1], box_i[2] - box_j[3]]);
      }
      if (is_point_in(box_j[0], box_j[3], box_i)) {
        exit_vectors.push([box_i[1] - box_j[0], box_i[2] - box_j[3]]);
      }
      if (exit_vectors.length < 1) {
        if (iteration === 0) {
          return Collision.test(box_j, box_i, 1);
        } else {
          return null;
        }
      }
      if (exit_vectors.length === 1) {
        return divide_vector(exit_vectors[0]);
      }
      if (exit_vectors.length === 2) {
        vector_x = (exit_vectors[0][0] + exit_vectors[1][0]) / 2;
        vector_y = (exit_vectors[0][1] + exit_vectors[1][1]) / 2;
        if (iteration === 1) {
          return devide_vector(invert_vector([vector_x, vector_y]));
        }
        return devide_vector([vector_x, vector_y]);
      }
    };

    is_point_in = function(x, y, box) {
      if (x > box[0] && x < box[1]) {
        if (y > box[2] && y < box[3]) {
          return true;
        }
      }
      return false;
    };

    invert_vector = function(vector) {
      return [-vector[0], -vector[1]];
    };

    devide_vector = function(vector) {
      var vector_1, vector_2;
      vector_2 = [vector[0] / 2.0, vector[1] / 2.0];
      vector_1 = invert_vector(vector_2);
      return [vector_1, vector_2];
    };

    return Collision;

  })();

  Phrase = (function() {
    var base_font_size, calculate_font_size, make_container;

    base_font_size = 50;

    function Phrase(title, text) {
      this.title = title;
      this.text = text;
      this.container = make_container(this.title);
      this.bind_click_trigger();
      this.fixed = false;
    }

    Phrase.prototype.fix_size = function() {
      this.width = this.container.width();
      this.height = this.container.height();
      this.container.css("width", this.width + "px");
      this.container.css("height", this.height + "px");
      return this.fixed = true;
    };

    Phrase.prototype.set_position = function(position) {
      var offset_x, offset_y;
      if (this.fixed === false) {
        this.fix_size();
      }
      offset_x = position[2][0] - this.width / 2;
      offset_y = position[2][0] - this.width / 2;
      this.container.css("left", position[0] + "%");
      this.container.css("top", position[1] + "%");
      this.container.css("margin-left", offset_x + "px");
      this.container.css("margin-top", offset_y + "px");
      return this.offset = [offset_x, offset_y];
    };

    Phrase.prototype.get_bounding_box = function() {
      var left, position, top;
      position = this.container.position();
      left = position.left + this.offset[0];
      top = position.top + this.offset[1];
      return [left - 15, left + this.width + 15, top - 15, top + this.height + 15];
    };

    Phrase.prototype.move = function(vector) {
      if (Math.abs(vector[0]) > Math.abs(vector[1])) {
        this.offset[0] += vector[0];
        return this.container.css("margin-left", this.offset[0] + "px");
      } else {
        this.offset[1] += vector[1];
        return this.container.css("margin-top", this.offset[1] + "px");
      }
    };

    Phrase.prototype.bind_click_trigger = function() {
      return this.container.click((function(_this) {
        return function() {
          return $(window).trigger("phrase-clicked", _this);
        };
      })(this));
    };

    Phrase.prototype.get_container = function() {
      return this.container;
    };

    make_container = function(phrase) {
      var font_size;
      font_size = calculate_font_size(phrase);
      return $('<div class="phrase">').html(phrase).css("font-size", font_size + "px");
    };

    calculate_font_size = function(phrase) {
      var phrase_length, scale_ratio;
      phrase_length = phrase.length;
      scale_ratio = 1.0;
      if (phrase_length > 7) {
        scale_ratio = 7.0 / phrase_length;
      }
      return base_font_size * scale_ratio;
    };

    return Phrase;

  })();

  Layer = (function() {
    var calc_opacity_level, make_container, mobile, stream;

    stream = $(".phrases");

    mobile = false;

    Layer.init = function() {
      var windowWidth;
      windowWidth = $(window).width();
      if (windowWidth < 768) {
        return mobile = true;
      }
    };

    function Layer() {
      this.container = make_container();
      stream.append(this.container);
      this.phrases = [];
      this.grid = new PhrasesGrid();
      this.grid.init_points_iterator();
      if (mobile === true) {
        this.skip_next = false;
      }
    }

    Layer.prototype.append_phrase = function(phrase) {
      if (mobile === true) {
        if (this.skip_next === true) {
          this.grid.get_next_position();
          return this.skip_next = false;
        } else {
          this.skip_next = true;
        }
      }
      this.container.prepend(phrase.get_container());
      phrase.set_position(this.grid.get_next_position());
      return this.phrases.push(phrase);
    };

    Layer.prototype.separate_phrases = function() {
      var box_i, box_j, collision, i, j, k, max, ref, results;
      max = this.phrases.length;
      results = [];
      for (i = k = 0, ref = max; 0 <= ref ? k < ref : k > ref; i = 0 <= ref ? ++k : --k) {
        results.push((function() {
          var l, ref1, ref2, results1;
          results1 = [];
          for (j = l = ref1 = i + 1, ref2 = max; ref1 <= ref2 ? l < ref2 : l > ref2; j = ref1 <= ref2 ? ++l : --l) {
            box_i = this.phrases[i].get_bounding_box();
            box_j = this.phrases[j].get_bounding_box();
            collision = Collision.test(box_i, box_j);
            if (collision !== null) {
              this.phrases[i].move(collision[0]);
              results1.push(this.phrases[j].move(collision[1]));
            } else {
              results1.push(void 0);
            }
          }
          return results1;
        }).call(this));
      }
      return results;
    };

    Layer.prototype.set_distance = function(distance) {
      var opacity, scale;
      if (distance < 0.0) {
        distance = 0.0;
      }
      scale = 100.0 / distance;
      if (scale > 3.0) {
        scale = 3.0;
      }
      opacity = calc_opacity_level(distance, scale);
      if (distance > 87.5 && distance < 112.5 && this.state !== true) {
        this.container.addClass("phrases__layer_in_focus");
        this.container.css("z-index", "2");
        this.state = true;
      }
      if ((distance < 87.5 || distance > 112.5) && this.state !== false) {
        this.container.removeClass("phrases__layer_in_focus");
        this.container.css("z-index", "0");
        this.state = false;
      }
      this.container.css("transform", "scale(" + scale + ")");
      return this.container.css("opacity", "" + opacity);
    };

    Layer.prototype.remove = function() {
      return this.container.remove();
    };

    calc_opacity_level = function(distance, scale) {
      var opacity_value;
      if (distance < 100.0) {
        return 1.0 - (scale - 1.0) / 2.0;
      }
      opacity_value = 100.0 / (distance * 3.0 - 200.0);
      if (opacity_value < 0.0) {
        opacity_value = 0.0;
      }
      return opacity_value;
    };

    make_container = function() {
      return $('<div class="phrases__layer">');
    };

    return Layer;

  })();

  this.PhrasesLayer = Layer;

  this.Phrase = Phrase;

  Layer.init();

}).call(this);
