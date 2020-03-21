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
  $pageStart: $('.page-start'),
  $pageQuestionsNav: $('.page-questions-nav'),

  $btnLinks: $('.btn[data-link]'),

  enableLinksListener() {
    this.$window.on('click', e => {
      const $btn = $(e.target).closest('.btn');
      if (!$btn.length) return;

      const link = $btn.attr('data-link');
      if (!link) return;

      const $from = $btn.closest('.page');
      const $to = $('.' + link);
      this.move($from, $to);
    });
  },

  move($from, $to) {
    $from.css('left', '-100%');
    if ($from.hasClass('page--move-right')) $from.css('left', '100%');

    $to.css({
      'left': '0',
    });
  }
};

class Test {
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
    this.questionsAmout = data.questions.length;

    return this;
  }

  enableAnswerListener() {
    $('.page-qn').on('click', this.answerHandlerBounded);

    return this;
  }

  answeredAmount = 0;
  answerHandler(e) {
    const $btn = $(e.target).closest('.page-qn_answer');
    if (!$btn.length) return;

    // Выделяет выбранный ответ
    $btn
      .addClass('btn--colored')
      .addClass('is-selected');

    // Убирает выделение других ответов если таковые были
    // Если нет, то инкремирует счетчик отвеченых вопросов
    const $previousSelected = $btn.siblings('.is-selected');
    if ($previousSelected.length) {
      $previousSelected
        .removeClass('btn--colored')
        .removeClass('is-selected');
    } else this.answeredAmount++;

    // Добавляет прозрачность ссылке в навигации на отвченый вопрос
    const index = $('.page-qn').index(e.currentTarget);

    $('.page-qns-nav_qn-link')
      .eq(index)
      .addClass('is-answered');

    // Меняет надпись на ссылке на следующий вопрос, выделяет ее
    $(e.currentTarget).find('.page-qn_btn-next')
      .addClass('btn--colored')
      .text('Следующий вопрос');

    // Проверяет отвечены ли все вопросы
    if (this.answeredAmount === this.questionsAmout) {
      // Выделяет кнопку кнопку окончания теста
      $('.page-qns-nav_finish').addClass('btn--colored');

      $('.page-qn_btns-container').each((index, container) => {
        const $container = $(container);
        let $buttonNext = $container.find('.page-qn_btn-next');

        if (!$buttonNext.length) {
          $buttonNext = this.getButtonNext()
            .appendTo($container);
        }

        $buttonNext
          .addClass('btn--colored')
          .addClass('page-qns-nav_finish')
          .text('Закончить')
          .off('click', this.answerHandlerBounded)
          .on('click', this.finishHandlerBounded);
      });
    }
  }
  answerHandlerBounded = this.answerHandler.bind(this);

  enableFinishListener() {
    $('.page-qns-nav_finish').on('click', this.finishHandlerBounded);

    return this;
  }

  finishHandler(e) {
    const $btn = $(e.target).closest('.page-qns-nav_finish');
    if (!$btn.length) return;

    this.buildResults();
  }
  finishHandlerBounded = this.finishHandler.bind(this);

  build() {
    return this
      .buildStart()
      .buildQnsNav()
      .buildQns();
  }

  buildStart() {
    const {name, description} = this.data;
    const $pageStart = $('.page-start');

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

  buildQnsNav() {
    const $pageQnsNavList = $('.page-qns-nav_list');

    for (let i = 0; i < this.questionsAmout; i++) {
      $(document.createElement('li'))
        .append(
          $(document.createElement('button'))
            .addClass('btn')
            .addClass('btn--colored')
            .addClass('page-qns-nav_qn-link')
            .attr('data-link', `page-qn-${i + 1}`)
            .text(`Вопрос ${i + 1}`)
        ).appendTo($pageQnsNavList);
    }

    return this;
  }

  buildQns() {
    const questions = this.data.questions;
    const elementsArray = this.qnsElements = [];

    for (let i = 0; i < this.questionsAmout; i++) {
      const {text, answers, imageSrc} = questions[i];

      elementsArray.push(
        $(document.createElement('section'))
          .data('qnNum', i)
          .addClass(`page-qn-${i + 1}`)
          .addClass('page-qn')
          .addClass('page')
          .addClass('page--move-right')
          .append(this.getHeader(i))
          .append(
            this.getContent()
              .append(this.getQuestion(text, imageSrc))
              .append(this.getAnswers(answers))
              .append(this.getButtons(i))
          ).appendTo('.window')
      );
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

    let result = ((correctAnswers.length / this.questionsAmout) * 100).toFixed(0);

    $('.page-results_correct-amount')
      .text(`${correctAnswers.length}/${this.questionsAmout}`);

    $('.page-results_correct-percentage')
      .text(`${result}%`);


    const {bad, moderate, good} = this.data.evaluation;
    let resultEvaluation;

    if (result <= bad) resultEvaluation = 'bad';
    else if (result <= moderate) resultEvaluation = 'moderate';
    else resultEvaluation = 'good';

    $('.page-results')
      .addClass(`is-${resultEvaluation}`)
      .css('top', '0');

    return this;
  }

  getHeader(index) {
    return $(document.createElement('header'))
      .addClass('page_header')
      .text(`Вопрос ${index + 1}`);
  }

  getContent() {
    return $(document.createElement('div'))
      .addClass('page-qn_content')
      .addClass('page_content');
  }

  getQuestion(text, imageSrc) {
    const $question = $(document.createElement('div'))
      .addClass('page-qn_question');
    if (imageSrc) $question.append(this.getImage(imageSrc));
    $question.append(this.getText(text));

    return $question;
  }

  getImage(src) {
    return $(document.createElement('img'))
      .addClass('page-qn_question-img')
      .attr('src', src);
  }

  getText(text) {
    return $(document.createElement('div'))
      .addClass('page-qn_question-text')
      .append(
        $(document.createElement('p')).text(text)
      );
  }

  getAnswers(answers) {
    return $(document.createElement('ul'))
      .addClass('page-qn_answers-list')
      .append(
        ...answers.map(answer => {
          return $(document.createElement('li'))
            .data('isCorrect', answer.isCorrect)
            .addClass('page-qn_answer')
            .addClass('btn')
            .text(answer.text);
        })
      );
  }

  getButtons(index) {
     const $container = $(document.createElement('div'))
      .addClass('page-qn_btns-container')
      .append(
        $(document.createElement('button'))
          .addClass('page-qn_btn')
          .addClass('btn')
          .attr('data-link', 'page-qns-nav')
          .text('Вернуться')
      );

     if (index + 1 < this.questionsAmout) {
       $container.append(this.getButtonNext(index));
     }

     return $container;
  }

  getButtonNext(index) {
    const buttonNext = $(document.createElement('button'))
      .addClass('page-qn_btn')
      .addClass('page-qn_btn-next')
      .addClass('btn')
      .text('Пропустить');

    if (isFinite(index)) buttonNext.attr('data-link', `page-qn-${index + 2}`);

    return buttonNext
  }
};

$(() => {
  navigation.enableLinksListener();
  new Test();
});