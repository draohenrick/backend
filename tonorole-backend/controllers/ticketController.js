const Ticket = require('../models/Ticket'); // Verifique se o caminho e o nome do modelo estão corretos
const Event = require('../models/Event');   // Verifique se o caminho e o nome do modelo estão corretos

// @desc    Criar um novo tipo de ingresso para um evento
// @route   POST /api/tickets
// @access  Private (Produtor)
const createTicket = async (req, res) => {
  try {
    const { eventId, name, price, quantity } = req.body;

    // Validação básica
    if (!eventId || !name || !price || !quantity) {
      return res.status(400).json({ message: 'Por favor, forneça todos os campos obrigatórios.' });
    }

    // Verifica se o evento existe
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Evento não encontrado.' });
    }
    
    // TODO: Adicionar verificação para garantir que o usuário logado é o dono do evento

    const newTicket = new Ticket({
      event: eventId,
      name,
      price,
      quantity,
    });

    const savedTicket = await newTicket.save();
    res.status(201).json(savedTicket);

  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor ao criar ingresso.', error: error.message });
  }
};

// @desc    Listar todos os ingressos de um evento específico
// @route   GET /api/tickets/event/:eventId
// @access  Public
const getTicketsByEvent = async (req, res) => {
    try {
        const { eventId } = req.params;
        const tickets = await Ticket.find({ event: eventId });
        
        if (!tickets) {
            return res.status(404).json({ message: 'Nenhum ingresso encontrado para este evento.' });
        }

        res.status(200).json(tickets);
    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor ao buscar ingressos.', error: error.message });
    }
};

// @desc    Atualizar um ingresso
// @route   PUT /api/tickets/:id
// @access  Private (Produtor)
const updateTicket = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedTicket = await Ticket.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedTicket) {
            return res.status(404).json({ message: 'Ingresso não encontrado.' });
        }
        
        res.status(200).json(updatedTicket);
    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor ao atualizar ingresso.', error: error.message });
    }
};

// @desc    Deletar um ingresso
// @route   DELETE /api/tickets/:id
// @access  Private (Produtor)
const deleteTicket = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTicket = await Ticket.findByIdAndDelete(id);

        if (!deletedTicket) {
            return res.status(404).json({ message: 'Ingresso não encontrado.' });
        }

        res.status(200).json({ message: 'Ingresso deletado com sucesso.' });
    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor ao deletar ingresso.', error: error.message });
    }
};


// Exporta todas as funções para serem usadas nas rotas
module.exports = {
  createTicket,
  getTicketsByEvent,
  updateTicket,
  deleteTicket,
};
