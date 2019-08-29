$(document).on('turbolinks:load', function(){
  function buildHTML(user){
    var html = `<div class="chat-group-users clearfix">
                  <p class="chat-group-users__name">
                    ${user.name}
                  </p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
                </div>`
    return html;
  }

  function appendErrMsgToHTML(msg) {
    var html = `<div class="chat-group-user clearfix">
                  <div class="chat-group-user__name">
                    <p>
                      ${msg}
                    </p>
                  </div>`
    $('.chat-group-search-user').append(html);
  }

  $('#user-search-field').on('keyup', function(e){
    e.preventDefault();  
    var input = $('#user-search-field').val();
    $.ajax({
      type: 'GET',
      url: '/users/search',
      data: { keyword: input },
      dataType: 'json'
    })

    .done(function(users){
      $(".chat-group-search-user").empty();
      if (input.length == 0) {
        $('.chat-group-search-user').empty();
      }
      else{
        if (users.length !== 0) {
          users.forEach(function(user){
            var html = buildHTML(user);
            $('.chat-group-search-user').append(html);
          });
        }
        else { 
          appendErrMsgToHTML('一致するユーザーはいません');
        }
      }
    })
    .fail(function(){
      alert('ユーザー検索に失敗しました')
    })
  });

  function appendAddUserToHTML(user) {
    var html = `<div class='chat-group-user clearfix js-chat-member'>
                  <input name='group[user_ids][]' type='hidden' value='${user.id}'>
                  <p class='chat-group-user__name'>${user.name}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>`
    $('.js-add-user').append(html);
  }

  $(document).on("click", ".chat-group-user__btn--add", function(e){
    e.preventDefault();
    $(this.parentNode).remove();
    var user = $(this).data('user-id');
    console.log(user)
    $.ajax({
      type: 'GET',
      url: '/users/find',
      data: {user_id: user},
      dataType: 'json'
    })
    .done(function(user){
      appendAddUserToHTML(user);
    })
    .fail(function(){
      alert('ユーザーを追加できませんでした')
    })
  })

  $(document).on("click", ".chat-group-user__btn--remove", function(e){
    e.preventDefault();
    $(this.parentNode).remove();
  })
});