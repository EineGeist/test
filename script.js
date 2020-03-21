'use strict';

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var testData = JSON.stringify({
  "name": "Английский язык",
  "description": "",
  "evaluation": {
    "bad": "30",
    "moderate": "60",
    "good": "100"
  },
  "questions": [{
    "text": "It _______ her being a teacher, I can't imagine her doing anything else.",
    "imageSrc": "",
    "answers": [{
      "text": "fits",
      "isCorrect": false
    }, {
      "text": "matches",
      "isCorrect": false
    }, {
      "text": "suits",
      "isCorrect": true
    }]
  }, {
    "text": "As soon as my grandma sits in front of the TV, she _______. I don't mind really, it's just that she snores so loudly I can't hear what they're saying on the telly!",
    "imageSrc": null,
    "answers": [{
      "text": "sleeps off",
      "isCorrect": false
    }, {
      "text": "nods off",
      "isCorrect": true
    }, {
      "text": "node of",
      "isCorrect": false
    }]
  }, {
    "text": "If you feel sad because your boyfriend or girlfriend leaves you, you may be suffering from _________ .",
    "imageSrc": null,
    "answers": [{
      "text": "a pain in your heart",
      "isCorrect": false
    }, {
      "text": "a painful heart",
      "isCorrect": false
    }, {
      "text": "heartache",
      "isCorrect": true
    }]
  }, {
    "text": "If you’ve got heavy bags to carry, you'd be ________ a taxi.",
    "imageSrc": null,
    "answers": [{
      "text": "better off taking",
      "isCorrect": true
    }, {
      "text": "well-off taking",
      "isCorrect": false
    }, {
      "text": "better of taking",
      "isCorrect": false
    }]
  }, {
    "text": "There was no room in the hotel, so they were __________ at the B&B nearby.",
    "imageSrc": null,
    "answers": [{
      "text": "accommodated",
      "isCorrect": true
    }, {
      "text": "accomodated",
      "isCorrect": false
    }, {
      "text": "acommodated",
      "isCorrect": false
    }]
  }, {
    "text": "You can only have your money back if you can produce _______ .",
    "imageSrc": null,
    "answers": [{
      "text": "a receipt",
      "isCorrect": true
    }, {
      "text": "an invoice",
      "isCorrect": false
    }, {
      "text": "a bill",
      "isCorrect": false
    }]
  }]
});
var navigation = {
  $window: $('.window'),
  $pageStart: $('.page-start'),
  $pageQuestionsNav: $('.page-questions-nav'),
  $btnLinks: $('.btn[data-link]'),
  enableLinksListener: function enableLinksListener() {
    var _this = this;

    this.$window.on('click', function (e) {
      var $btn = $(e.target).closest('.btn');
      if (!$btn.length) return;
      var link = $btn.attr('data-link');
      if (!link) return;
      var $from = $btn.closest('.page');
      var $to = $('.' + link);

      _this.move($from, $to);
    });
  },
  move: function move($from, $to) {
    $from.css('left', '-100%');
    if ($from.hasClass('page--move-right')) $from.css('left', '100%');
    $to.css({
      'left': '0'
    });
  }
};

var Test = /*#__PURE__*/function () {
  function Test() {
    _classCallCheck(this, Test);

    _defineProperty(this, "answeredAmount", 0);

    _defineProperty(this, "answerHandlerBounded", this.answerHandler.bind(this));

    _defineProperty(this, "finishHandlerBounded", this.finishHandler.bind(this));

    if (Test.instance) return Test.instance;
    Test.instance = this;
    this.extractData().build().enableAnswerListener().enableFinishListener();
  }

  _createClass(Test, [{
    key: "extractData",
    value: function extractData() {
      var data = this.data = JSON.parse(testData);
      this.questionsAmout = data.questions.length;
      return this;
    }
  }, {
    key: "enableAnswerListener",
    value: function enableAnswerListener() {
      $('.page-qn').on('click', this.answerHandlerBounded);
      return this;
    }
  }, {
    key: "answerHandler",
    value: function answerHandler(e) {
      var _this2 = this;

      var $btn = $(e.target).closest('.page-qn_answer');
      if (!$btn.length) return; // Выделяет выбранный ответ

      $btn.addClass('btn--colored').addClass('is-selected'); // Убирает выделение других ответов если таковые были
      // Если нет, то инкремирует счетчик отвеченых вопросов

      var $previousSelected = $btn.siblings('.is-selected');

      if ($previousSelected.length) {
        $previousSelected.removeClass('btn--colored').removeClass('is-selected');
      } else this.answeredAmount++; // Добавляет прозрачность ссылке в навигации на отвченый вопрос


      var index = $('.page-qn').index(e.currentTarget);
      $('.page-qns-nav_qn-link').eq(index).addClass('is-answered'); // Меняет надпись на ссылке на следующий вопрос, выделяет ее

      $(e.currentTarget).find('.page-qn_btn-next').addClass('btn--colored').text('Следующий вопрос'); // Проверяет отвечены ли все вопросы

      if (this.answeredAmount === this.questionsAmout) {
        // Выделяет кнопку кнопку окончания теста
        $('.page-qns-nav_finish').addClass('btn--colored');
        $('.page-qn_btns-container').each(function (index, container) {
          var $container = $(container);
          var $buttonNext = $container.find('.page-qn_btn-next');

          if (!$buttonNext.length) {
            $buttonNext = _this2.getButtonNext().appendTo($container);
          }

          $buttonNext.addClass('btn--colored').addClass('page-qns-nav_finish').text('Закончить').off('click', _this2.answerHandlerBounded).on('click', _this2.finishHandlerBounded);
        });
      }
    }
  }, {
    key: "enableFinishListener",
    value: function enableFinishListener() {
      $('.page-qns-nav_finish').on('click', this.finishHandlerBounded);
      return this;
    }
  }, {
    key: "finishHandler",
    value: function finishHandler(e) {
      var $btn = $(e.target).closest('.page-qns-nav_finish');
      if (!$btn.length) return;
      this.buildResults();
    }
  }, {
    key: "build",
    value: function build() {
      return this.buildStart().buildQnsNav().buildQns();
    }
  }, {
    key: "buildStart",
    value: function buildStart() {
      var _this$data = this.data,
          name = _this$data.name,
          description = _this$data.description;
      var $pageStart = $('.page-start');

      if (name) {
        $(document.createElement('span')).addClass('page-start_title-sub').text(name).insertAfter($pageStart.find('.page_header'));
      }

      if (description) {
        $(document.createElement('p')).text(description).appendTo($pageStart.find('.page-start_des'));
      }

      return this;
    }
  }, {
    key: "buildQnsNav",
    value: function buildQnsNav() {
      var $pageQnsNavList = $('.page-qns-nav_list');

      for (var i = 0; i < this.questionsAmout; i++) {
        $(document.createElement('li')).append($(document.createElement('button')).addClass('btn').addClass('btn--colored').addClass('page-qns-nav_qn-link').attr('data-link', "page-qn-".concat(i + 1)).text("\u0412\u043E\u043F\u0440\u043E\u0441 ".concat(i + 1))).appendTo($pageQnsNavList);
      }

      return this;
    }
  }, {
    key: "buildQns",
    value: function buildQns() {
      var questions = this.data.questions;
      var elementsArray = this.qnsElements = [];

      for (var i = 0; i < this.questionsAmout; i++) {
        var _questions$i = questions[i],
            text = _questions$i.text,
            answers = _questions$i.answers,
            imageSrc = _questions$i.imageSrc;
        elementsArray.push($(document.createElement('section')).data('qnNum', i).addClass("page-qn-".concat(i + 1)).addClass('page-qn').addClass('page').addClass('page--move-right').append(this.getHeader(i)).append(this.getContent().append(this.getQuestion(text, imageSrc)).append(this.getAnswers(answers)).append(this.getButtons(i))).appendTo('.window'));
      }

      return this;
    }
  }, {
    key: "buildResults",
    value: function buildResults() {
      var answers = [];
      $('.page-qn').each(function (index, current) {
        answers.push($(current).find('.is-selected'));
      });
      var correctAnswers = answers.filter(function ($answer) {
        return $answer.data('isCorrect');
      });
      var result = (correctAnswers.length / this.questionsAmout * 100).toFixed(0);
      $('.page-results_correct-amount').text("".concat(correctAnswers.length, "/").concat(this.questionsAmout));
      $('.page-results_correct-percentage').text("".concat(result, "%"));
      var _this$data$evaluation = this.data.evaluation,
          bad = _this$data$evaluation.bad,
          moderate = _this$data$evaluation.moderate,
          good = _this$data$evaluation.good;
      var resultEvaluation;
      if (result <= bad) resultEvaluation = 'bad';else if (result <= moderate) resultEvaluation = 'moderate';else resultEvaluation = 'good';
      $('.page-results').addClass("is-".concat(resultEvaluation)).css('top', '0');
      return this;
    }
  }, {
    key: "getHeader",
    value: function getHeader(index) {
      return $(document.createElement('header')).addClass('page_header').text("\u0412\u043E\u043F\u0440\u043E\u0441 ".concat(index + 1));
    }
  }, {
    key: "getContent",
    value: function getContent() {
      return $(document.createElement('div')).addClass('page-qn_content').addClass('page_content');
    }
  }, {
    key: "getQuestion",
    value: function getQuestion(text, imageSrc) {
      var $question = $(document.createElement('div')).addClass('page-qn_question');
      if (imageSrc) $question.append(this.getImage(imageSrc));
      $question.append(this.getText(text));
      return $question;
    }
  }, {
    key: "getImage",
    value: function getImage(src) {
      return $(document.createElement('img')).addClass('page-qn_question-img').attr('src', src);
    }
  }, {
    key: "getText",
    value: function getText(text) {
      return $(document.createElement('div')).addClass('page-qn_question-text').append($(document.createElement('p')).text(text));
    }
  }, {
    key: "getAnswers",
    value: function getAnswers(answers) {
      var _$$addClass;

      return (_$$addClass = $(document.createElement('ul')).addClass('page-qn_answers-list')).append.apply(_$$addClass, _toConsumableArray(answers.map(function (answer) {
        return $(document.createElement('li')).data('isCorrect', answer.isCorrect).addClass('page-qn_answer').addClass('btn').text(answer.text);
      })));
    }
  }, {
    key: "getButtons",
    value: function getButtons(index) {
      var $container = $(document.createElement('div')).addClass('page-qn_btns-container').append($(document.createElement('button')).addClass('page-qn_btn').addClass('btn').attr('data-link', 'page-qns-nav').text('Вернуться'));

      if (index + 1 < this.questionsAmout) {
        $container.append(this.getButtonNext(index));
      }

      return $container;
    }
  }, {
    key: "getButtonNext",
    value: function getButtonNext(index) {
      var buttonNext = $(document.createElement('button')).addClass('page-qn_btn').addClass('page-qn_btn-next').addClass('btn').text('Пропустить');
      if (isFinite(index)) buttonNext.attr('data-link', "page-qn-".concat(index + 2));
      return buttonNext;
    }
  }]);

  return Test;
}();

;
$(function () {
  navigation.enableLinksListener();
  new Test();
});
