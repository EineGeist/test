'use strict';

const testData = JSON.stringify(
  {
    "name": "Английский язык",
    "description": "",
    "evaluation": {
      "bad": "30",
      "moderate": "60",
      "good": "100"
    },

    "questions": [
      {
        "text": "It _______ her being a teacher, I can't imagine her doing anything else.",
        "imageSrc": "",
        "answers":
          [
            {
              "text": "fits",
              "isCorrect": false
            }, {
              "text": "matches",
              "isCorrect": false
            }, {
              "text": "suits",
              "isCorrect": true
            }
          ]
      }, {
        "text": "As soon as my grandma sits in front of the TV, she _______. I don't mind really, it's just that she snores so loudly I can't hear what they're saying on the telly!",
        "imageSrc": null,
        "answers": [
          {
            "text": "sleeps off",
            "isCorrect": false
          }, {
            "text": "nods off",
            "isCorrect": true
          }, {
            "text": "node of",
            "isCorrect": false
          }
        ]
      }, {
        "text": "If you feel sad because your boyfriend or girlfriend leaves you, you may be suffering from _________ .",
        "imageSrc": null,
        "answers": [
          {
            "text": "a pain in your heart",
            "isCorrect": false
          }, {
            "text": "a painful heart",
            "isCorrect": false
          }, {
            "text": "heartache",
            "isCorrect": true
          }
        ]
      }, {
        "text": "If you’ve got heavy bags to carry, you'd be ________ a taxi.",
        "imageSrc": null,
        "answers": [
          {
            "text": "better off taking",
            "isCorrect": true
          }, {
            "text": "well-off taking",
            "isCorrect": false
          }, {
            "text": "better of taking",
            "isCorrect": false
          }
        ]
      }, {
        "text": "There was no room in the hotel, so they were __________ at the B&B nearby.",
        "imageSrc": null,
        "answers": [
          {
            "text": "accommodated",
            "isCorrect": true
          }, {
            "text": "accomodated",
            "isCorrect": false
          }, {
            "text": "acommodated",
            "isCorrect": false
          }
        ]
      }, {
        "text": "You can only have your money back if you can produce _______ .",
        "imageSrc": null,
        "answers": [
          {
            "text": "a receipt",
            "isCorrect": true
          }, {
            "text": "an invoice",
            "isCorrect": false
          }, {
            "text": "a bill",
            "isCorrect": false
          }
        ]
      }
    ]
  }
);

const navigation = {
  $window: $('.window'),

  enableLinksListener() {
    this.$window.on('click', e => {
      const $btn = $(e.target).closest('.btn');
      if (!$btn.length) return;

      const link = $btn.data('link');
      if (!link) return;

      const $from = $btn.closest('.page');
      const $to = $(link);
      this.move($from, $to);
    });
  },

  move($from, $to) {
    $from.data('hide')();
    $to.data('show')();
  }
};

class Test {
  $window = $('.window');

  constructor() {
    if (Test.instance) return Test.instance;
    Test.instance = this;

    this
      .extractData()
      .build()
      .enableAnswerListener()
      .enableFinishListener();
  }

  extractData() {
    const data = this.data = JSON.parse(testData);
    this.questionsAmount = data.questions.length;

    return this;
  }

  enableAnswerListener() {
    $('.page-qn').on('click', this.answerHandler);

    return this;
  }

  answeredAmount = 0;
  answerHandler = ({target, currentTarget: page}) => {
    const $answer = $(target).closest('.page-qn_answer');
    if (!$answer.length) return;

    this.selectAnswer($(page), $answer);

    if (this.answeredAmount >= this.questionsAmount) {
      this.answersGivenHandler();
    }
  };

  selectAnswer($page, $answer) {
    // Убирает выделение других ответов если таковые были
    // Если нет, то инкремирует счетчик отвеченых вопросов
    const $previousSelected = $answer.siblings('.is-selected')
      .removeClass('btn--colored')
      .removeClass('is-selected');

    if (!($previousSelected.length || $answer.hasClass('is-selected'))) {
      ++this.answeredAmount;
    }

    // Выделяет выбранный ответ
    $answer
      .addClass('btn--colored')
      .addClass('is-selected');

    // Добавляет прозрачность ссылке в навигации на отвченый вопрос
    const index = $page.data('index');
    $('.page-menu_qn-link')
      .eq(index)
      .addClass('is-answered');

    // Меняет надпись на ссылке на следующий вопрос, выделяет ее
    $page.find('.page-qn_nav-next')
      .addClass('btn--colored')
      .text('Следующий вопрос');
  }

  answersGivenHandler() {
    $('.page-menu_finish').addClass('btn--colored');

    $('.page-qn_nav-container').each((index, container) => {
      const $container = $(container);
      let $buttonNext = $container.find('.page-qn_nav-next');

      if (!$buttonNext.length) {
        const {questions, questionsAmount} = this;
        $buttonNext = questions[questionsAmount - 1]
          .getButtonNext(null)
          .appendTo($container);
      }

      $buttonNext
        .addClass('btn--colored')
        .addClass('page-menu_finish')
        .text('Закончить')
        .off('click', this.answerHandler)
        .on('click', this.finishHandler);
    });
  }

  enableFinishListener() {
    $('.page-menu_finish').on('click', this.finishHandler);

    return this;
  }

  finishHandler = ({target}) => {
    const $btn = $(target).closest('.page-menu_finish');
    if (!$btn.length) return;

    this.buildResults();
  };

  build() {
    return this
      .buildStart()
      .buildQuestionPages()
      .buildMenu();
  }

  buildStart() {
    const {name, description} = this.data;
    const $pageStart = $('.page-start');

    $pageStart.data('hide', () => $pageStart.css('left', '-100%'));
    $pageStart.find('.page-start_btn').data('link', '.page-menu');

    if (name) {
      $(document.createElement('span'))
        .addClass('page-start_title-sub')
        .text(name)
        .insertAfter($pageStart.find('.page_header'));
    }

    if (description) {
      $(document.createElement('p'))
        .text(description)
        .appendTo($pageStart.find('.page-start_des'));
    }

    return this;
  }

  buildQuestionPages() {
    const {questionsAmount, $window} = this;
    const questionsData = this.data.questions;

    const questions = this.questions = [];
    for (let i = 0; i < questionsAmount; i++) {
      questions.push(new QuestionPage(questionsData[i], i, questionsAmount));
    }

    const $questionPages = questions.map(page => {
      return page.$page;
    });

    $window.append(...$questionPages);

    return this;
  }

  buildMenu() {
    const {questions} = this;
    const $menu = $('.page-menu');
    const $questionsList = $menu.find('.page-menu_qns-list');

    $menu.data({
      'show': () => $menu.css('left', '0'),
      'hide': () => {}
    });

    for (let i = 0; i < this.questionsAmount; i++) {
      questions[i].menuLink =
        $(document.createElement('li'))
            .addClass('btn')
            .addClass('btn--colored')
            .addClass('page-menu_qn-link')
            .data('link', `.page-qn-${i + 1}`)
            .text(`Вопрос ${i + 1}`
          ).appendTo($questionsList);
    }

    return this;
  }

  buildResults() {
    const answers = [];

    $('.page-qn').each((index, current) => {
      answers.push($(current).find('.is-selected'));
    });

    const correctAnswers = answers.filter($answer => {
      return $answer.data('isCorrect');
    });

    let result = ((correctAnswers.length / this.questionsAmount) * 100).toFixed(0);

    $('.page-results_correct-amount')
      .text(`${correctAnswers.length}/${this.questionsAmount}`);

    $('.page-results_correct-percentage')
      .text(`${result}%`);


    const {bad, moderate, good} = this.data.evaluation;
    let resultEvaluation;

    if (result <= bad) resultEvaluation = 'bad';
    else if (result <= moderate) resultEvaluation = 'moderate';
    else if (result <= good) resultEvaluation = 'good';

    $('.page-results')
      .addClass(`is-${resultEvaluation}`)
      .css('top', '0');

    return this;
  }
}

class Page {
  constructor() {}

  getPage() {
    return $(document.createElement('section'))
      .addClass('page');
  }

  getHeader() {
    return $(document.createElement('header'))
      .addClass('page_header');
  }

  getContent() {
    return $(document.createElement('div'))
      .addClass('page_content');
  }
}

class QuestionPage extends Page {
  constructor(data, index, questionsAmount) {
    super();
    this.data = data;
    this.index = index;
    this.questionsAmount = questionsAmount;

    this.$page = this.getPage();
  }

  getPage() {
    const $page = super.getPage()
      .addClass(`page-qn-${this.index + 1}`)
      .addClass('page-qn')
      .append(this.getHeader())
      .append(this.getContent())
      .data({
        'show': () => $page.css('top', '0'),
        'hide': () => $page.css('top', '-100%'),
        'index': this.index
      });

    return $page;
  }

  getHeader() {
    return super.getHeader()
      .text(`Вопрос ${this.index + 1}`);
  }

  getContent() {
    return super.getContent()
      .addClass('page-qn_content')
      .append(this.getQuestion())
      .append(this.getAnswers())
      .append(this.getButtons());
  }

  getQuestion() {
    const {text, imageSrc} = this.data;

    const $question = $(document.createElement('div'))
      .addClass('page-qn_qn');

    if (imageSrc) $question.append(this.getImage(imageSrc));
    $question.append(this.getText(text));

    return $question;
  }

  getImage(src) {
    return $(document.createElement('img'))
      .addClass('page-qn_qn-img')
      .attr('src', src);
  }

  getText(text) {
    return $(document.createElement('div'))
      .addClass('page-qn_qn-text-container')
      .append(
        $(document.createElement('p')).text(text)
      );
  }

  getAnswers() {
    const {answers} = this.data;

    return $(document.createElement('ul'))
      .addClass('page-qn_answers-list')
      .append(
        ...answers.map(answer =>
          $(document.createElement('li'))
            .addClass('page-qn_answer')
            .addClass('btn')
            .data('isCorrect', answer.isCorrect)
            .text(answer.text)
        )
      );
  }

  getButtons() {
    const {index, questionsAmount} = this;

    const $container = $(document.createElement('nav'))
      .addClass('page-qn_nav-container')
      .append(this.getButtonMenu());

    const isLastQuestion = index + 1 === questionsAmount;
    if (!isLastQuestion) {
      $container.append(this.getButtonNext(index));
    }

    return $container;
  }

  getButtonMenu() {
    return $(document.createElement('button'))
      .addClass('page-qn_nav-btn')
      .addClass('btn')
      .data('link', '.page-menu')
      .text('Вернуться');
  }

  getButtonNext(index) {
    const buttonNext = this.$buttonNext
      = $(document.createElement('button'))
        .addClass('page-qn_nav-btn')
        .addClass('page-qn_nav-next')
        .addClass('btn')
        .text('Пропустить');


    if (isFinite(index) && index !== null) {
      const nextQuestionIndex = index + 2;
      buttonNext.data('link', `.page-qn-${nextQuestionIndex}`);
    }

    return buttonNext;
  }
}

$(() => {
  navigation.enableLinksListener();
  new Test();
});