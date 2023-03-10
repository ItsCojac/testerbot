$(document).ready(function () {
    // Populate tokens in dropdown menus
    $.getJSON('/api/tokens', function (tokens) {
      $.each(tokens, function (index, token) {
        $('#token1').append($('<option>').val(token.address).text(token.name));
        $('#token2').append($('<option>').val(token.address).text(token.name));
      });
    });
  
    // Retrieve and display arbitrage opportunities
    $.getJSON('/api/arbitrage', function (opportunities) {
      var opportunitiesList = $('#opportunities-list');
      $.each(opportunities, function (index, opportunity) {
        var listItem = $('<li>').addClass('list-group-item');
        var opportunityLink = $('<a>').attr('href', '#').text(opportunity.pair);
        opportunityLink.click(function () {
          $('#token1').val(opportunity.token1.address);
          $('#amount1').val(opportunity.amount1);
          $('#token2').val(opportunity.token2.address);
          $('#amount2').val(opportunity.amount2);
          $('#profit').val(opportunity.profit);
        });
        listItem.append(opportunityLink);
        opportunitiesList.append(listItem);
      });
    });
  
    // Execute trade
    $('#execute-trade').click(function () {
      var token1 = $('#token1').val();
      var amount1 = $('#amount1').val();
      var token2 = $('#token2').val();
      var amount2 = $('#amount2').val();
      var profit = $('#profit').val();
      if (token1 && amount1 && token2 && amount2 && profit) {
        $.post('/api/trade', {
          token1: token1,
          amount1: amount1,
          token2: token2,
          amount2: amount2,
          profit: profit
        }, function (result) {
          alert(result);
        });
      }
    });
  });
  