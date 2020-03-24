'use strict';

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

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
  enableLinksListener: function enableLinksListener() {
    var _this = this;

    this.$window.on('click', function (e) {
      var $btn = $(e.target).closest('.btn');
      if (!$btn.length) return;
      var link = $btn.data('link');
      if (!link) return;
      var $from = $btn.closest('.page');
      var $to = $(link);

      _this.move($from, $to);
    });
  },
  move: function move($from, $to) {
    $from.data('hide')();
    $to.data('show')();
  }
};

var Test = /*#__PURE__*/function () {
  function Test() {
    var _this2 = this;

    _classCallCheck(this, Test);

    _defineProperty(this, "$window", $('.window'));

    _defineProperty(this, "answeredAmount", 0);

    _defineProperty(this, "answerHandler", function (_ref) {
      var target = _ref.target,
          page = _ref.currentTarget;
      var $answer = $(target).closest('.page-qn_answer');
      if (!$answer.length) return;

      _this2.selectAnswer($(page), $answer);

      if (_this2.answeredAmount >= _this2.questionsAmount) {
        _this2.answersGivenHandler();
      }
    });

    _defineProperty(this, "finishHandler", function (_ref2) {
      var target = _ref2.target;
      var $btn = $(target).closest('.page-menu_finish');
      if (!$btn.length) return;

      _this2.buildResults();
    });

    if (Test.instance) return Test.instance;
    Test.instance = this;
    this.extractData().build().enableAnswerListener().enableFinishListener();
  }

  _createClass(Test, [{
    key: "extractData",
    value: function extractData() {
      var data = this.data = JSON.parse(testData);
      this.questionsAmount = data.questions.length;
      return this;
    }
  }, {
    key: "enableAnswerListener",
    value: function enableAnswerListener() {
      $('.page-qn').on('click', this.answerHandler);
      return this;
    }
  }, {
    key: "selectAnswer",
    value: function selectAnswer($page, $answer) {
      // Убирает выделение других ответов если таковые были
      // Если нет, то инкремирует счетчик отвеченых вопросов
      var $previousSelected = $answer.siblings('.is-selected').removeClass('btn--colored').removeClass('is-selected');

      if (!($previousSelected.length || $answer.hasClass('is-selected'))) {
        ++this.answeredAmount;
      } // Выделяет выбранный ответ


      $answer.addClass('btn--colored').addClass('is-selected'); // Добавляет прозрачность ссылке в навигации на отвченый вопрос

      var index = $page.data('index');
      $('.page-menu_qn-link').eq(index).addClass('is-answered'); // Меняет надпись на ссылке на следующий вопрос, выделяет ее

      $page.find('.page-qn_nav-next').addClass('btn--colored').text('Следующий вопрос');
    }
  }, {
    key: "answersGivenHandler",
    value: function answersGivenHandler() {
      var _this3 = this;

      $('.page-menu_finish').addClass('btn--colored');
      $('.page-qn_nav-container').each(function (index, container) {
        var $container = $(container);
        var $buttonNext = $container.find('.page-qn_nav-next');

        if (!$buttonNext.length) {
          var questions = _this3.questions,
              questionsAmount = _this3.questionsAmount;
          $buttonNext = questions[questionsAmount - 1].getButtonNext(null).appendTo($container);
        }

        $buttonNext.addClass('btn--colored').addClass('page-menu_finish').text('Закончить').off('click', _this3.answerHandler).on('click', _this3.finishHandler);
      });
    }
  }, {
    key: "enableFinishListener",
    value: function enableFinishListener() {
      $('.page-menu_finish').on('click', this.finishHandler);
      return this;
    }
  }, {
    key: "build",
    value: function build() {
      return this.buildStart().buildQuestionPages().buildMenu();
    }
  }, {
    key: "buildStart",
    value: function buildStart() {
      var _this$data = this.data,
          name = _this$data.name,
          description = _this$data.description;
      var $pageStart = $('.page-start');
      $pageStart.data('hide', function () {
        return $pageStart.css('left', '-100%');
      });
      $pageStart.find('.page-start_btn').data('link', '.page-menu');

      if (name) {
        $(document.createElement('span')).addClass('page-start_title-sub').text(name).insertAfter($pageStart.find('.page_header'));
      }

      if (description) {
        $(document.createElement('p')).text(description).appendTo($pageStart.find('.page-start_des'));
      }

      return this;
    }
  }, {
    key: "buildQuestionPages",
    value: function buildQuestionPages() {
      var questionsAmount = this.questionsAmount,
          $window = this.$window;
      var questionsData = this.data.questions;
      var questions = this.questions = [];

      for (var i = 0; i < questionsAmount; i++) {
        questions.push(new QuestionPage(questionsData[i], i, questionsAmount));
      }

      var $questionPages = questions.map(function (page) {
        return page.$page;
      });
      $window.append.apply($window, _toConsumableArray($questionPages));
      return this;
    }
  }, {
    key: "buildMenu",
    value: function buildMenu() {
      var questions = this.questions;
      var $menu = $('.page-menu');
      var $questionsList = $menu.find('.page-menu_qns-list');
      $menu.data({
        'show': function show() {
          return $menu.css('left', '0');
        },
        'hide': function hide() {}
      });

      for (var i = 0; i < this.questionsAmount; i++) {
        questions[i].menuLink = $(document.createElement('li')).addClass('btn').addClass('btn--colored').addClass('page-menu_qn-link').data('link', ".page-qn-".concat(i + 1)).text("\u0412\u043E\u043F\u0440\u043E\u0441 ".concat(i + 1)).appendTo($questionsList);
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
      var result = (correctAnswers.length / this.questionsAmount * 100).toFixed(0);
      $('.page-results_correct-amount').text("".concat(correctAnswers.length, "/").concat(this.questionsAmount));
      $('.page-results_correct-percentage').text("".concat(result, "%"));
      var _this$data$evaluation = this.data.evaluation,
          bad = _this$data$evaluation.bad,
          moderate = _this$data$evaluation.moderate,
          good = _this$data$evaluation.good;
      var resultEvaluation;
      if (result <= bad) resultEvaluation = 'bad';else if (result <= moderate) resultEvaluation = 'moderate';else if (result <= good) resultEvaluation = 'good';
      $('.page-results').addClass("is-".concat(resultEvaluation)).css('top', '0');
      return this;
    }
  }]);

  return Test;
}();

var Page = /*#__PURE__*/function () {
  function Page() {
    _classCallCheck(this, Page);
  }

  _createClass(Page, [{
    key: "getPage",
    value: function getPage() {
      return $(document.createElement('section')).addClass('page');
    }
  }, {
    key: "getHeader",
    value: function getHeader() {
      return $(document.createElement('header')).addClass('page_header');
    }
  }, {
    key: "getContent",
    value: function getContent() {
      return $(document.createElement('div')).addClass('page_content');
    }
  }]);

  return Page;
}();

var QuestionPage = /*#__PURE__*/function (_Page) {
  _inherits(QuestionPage, _Page);

  var _super = _createSuper(QuestionPage);

  function QuestionPage(data, index, questionsAmount) {
    var _this4;

    _classCallCheck(this, QuestionPage);

    _this4 = _super.call(this);
    _this4.data = data;
    _this4.index = index;
    _this4.questionsAmount = questionsAmount;
    _this4.$page = _this4.getPage();
    return _this4;
  }

  _createClass(QuestionPage, [{
    key: "getPage",
    value: function getPage() {
      var $page = _get(_getPrototypeOf(QuestionPage.prototype), "getPage", this).call(this).addClass("page-qn-".concat(this.index + 1)).addClass('page-qn').append(this.getHeader()).append(this.getContent()).data({
        'show': function show() {
          return $page.css('top', '0');
        },
        'hide': function hide() {
          return $page.css('top', '-100%');
        },
        'index': this.index
      });

      return $page;
    }
  }, {
    key: "getHeader",
    value: function getHeader() {
      return _get(_getPrototypeOf(QuestionPage.prototype), "getHeader", this).call(this).text("\u0412\u043E\u043F\u0440\u043E\u0441 ".concat(this.index + 1));
    }
  }, {
    key: "getContent",
    value: function getContent() {
      return _get(_getPrototypeOf(QuestionPage.prototype), "getContent", this).call(this).addClass('page-qn_content').append(this.getQuestion()).append(this.getAnswers()).append(this.getButtons());
    }
  }, {
    key: "getQuestion",
    value: function getQuestion() {
      var _this$data2 = this.data,
          text = _this$data2.text,
          imageSrc = _this$data2.imageSrc;
      var $question = $(document.createElement('div')).addClass('page-qn_qn');
      if (imageSrc) $question.append(this.getImage(imageSrc));
      $question.append(this.getText(text));
      return $question;
    }
  }, {
    key: "getImage",
    value: function getImage(src) {
      return $(document.createElement('img')).addClass('page-qn_qn-img').attr('src', src);
    }
  }, {
    key: "getText",
    value: function getText(text) {
      return $(document.createElement('div')).addClass('page-qn_qn-text-container').append($(document.createElement('p')).text(text));
    }
  }, {
    key: "getAnswers",
    value: function getAnswers() {
      var _$$addClass;

      var answers = this.data.answers;
      return (_$$addClass = $(document.createElement('ul')).addClass('page-qn_answers-list')).append.apply(_$$addClass, _toConsumableArray(answers.map(function (answer) {
        return $(document.createElement('li')).addClass('page-qn_answer').addClass('btn').data('isCorrect', answer.isCorrect).text(answer.text);
      })));
    }
  }, {
    key: "getButtons",
    value: function getButtons() {
      var index = this.index,
          questionsAmount = this.questionsAmount;
      var $container = $(document.createElement('nav')).addClass('page-qn_nav-container').append(this.getButtonMenu());
      var isLastQuestion = index + 1 === questionsAmount;

      if (!isLastQuestion) {
        $container.append(this.getButtonNext(index));
      }

      return $container;
    }
  }, {
    key: "getButtonMenu",
    value: function getButtonMenu() {
      return $(document.createElement('button')).addClass('page-qn_nav-btn').addClass('btn').data('link', '.page-menu').text('Вернуться');
    }
  }, {
    key: "getButtonNext",
    value: function getButtonNext(index) {
      var buttonNext = this.$buttonNext = $(document.createElement('button')).addClass('page-qn_nav-btn').addClass('page-qn_nav-next').addClass('btn').text('Пропустить');

      if (isFinite(index) && index !== null) {
        var nextQuestionIndex = index + 2;
        buttonNext.data('link', ".page-qn-".concat(nextQuestionIndex));
      }

      return buttonNext;
    }
  }]);

  return QuestionPage;
}(Page);

$(function () {
  navigation.enableLinksListener();
  new Test();
});
