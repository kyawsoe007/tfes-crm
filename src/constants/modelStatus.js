export const purchaseStatus = {
    OPEN: 'open',
    DRAFT: 'draft',
    ERROR_STATUS: 'error status',
    REQUEST: 'Approval requested',
     // uneditable
    CANCELLED: 'cancelled',
    PARTIAL: 'partial',
    CLOSED: 'closed',
    
    
}

export const stockOperationStatus = {
    OPEN: 'open',
    PARTIAL: 'partial',
    CLOSED: 'closed'
}

export const saleStatus = {
    OPEN: 'open',
    DRAFT: 'draft',
    // uneditable
    CANCELLED: 'cancelled',
    DELIVERED : 'delivered', 
    INVOICED: 'invoiced',
    CLOSED : 'closed',
    PARTIALINVOICED : 'partial invoiced'
}
export const quotationStatus = {
    ISSUED :'issued',
    DRAFT :'draft',
    WIN :'win',
    LOSS : 'loss',
    DELAY : 'delay',
}

export const deliveryStatus = {
    DRAFT : "draft",
    CONFIRMED : 'confirmed',
    CLOSED : 'closed',
    RESCHEDULED : 'rescheduled',
    PARTIAL : 'partial',
    COMPLETED: 'completed'
}

export const workorderStatus = {
    OPEN: 'open',
    WAITING: 'waiting',
    PROCESSING: 'processing',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled'
}

export const invoiceStatus = {
    DRAFT: 'draft',
    UNPAID: 'unpaid',
    PARTIAL: 'partial',
    PAID: 'closed',
    CONFIRMED: 'confirmed',
    CANCELLED: 'cancelled'
}

export const expenseClaimsStatus = {
    DRAFT: 'draft',
    WAITINGAPPROVAL: 'waiting-approval',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    PAID: 'paid'
}
